import {loadEnvConfig} from '@next/env';
import {createClient, type SanityDocument} from 'next-sanity';

loadEnvConfig(process.cwd());

const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-09-19';
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const writeMode = process.argv.includes('--write');
const managedTypes = ['siteSettings', 'homepage', 'productCategory', 'product', 'brand', 'blogPost', 'legalPage'];
const publishedTypes = new Set(managedTypes);
const idTypes = new Set([...managedTypes, 'singleton']);

if (!projectId || !dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.');
}

if (!token) {
  throw new Error('SANITY_API_WRITE_TOKEN is required for the protected Dataset inspection.');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: API_VERSION,
  perspective: 'raw',
  useCdn: false,
  token,
});

const publicClient = createClient({
  projectId,
  dataset,
  apiVersion: API_VERSION,
  perspective: 'published',
  useCdn: true,
});

const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const rekeyId = (id: string) => {
  const match = id.match(/^migration\.([^.]+)\.(.+)$/);
  if (!match || !idTypes.has(match[1])) return id;
  return `migration-${match[1]}-${match[2]}`;
};

const isPublishedMigrationDocument = (document: SanityDocument) =>
  publishedTypes.has(document._type) && document._id.startsWith('migration.');

const stripSystemFields = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stripSystemFields);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !['_id', '_rev', '_createdAt', '_updatedAt'].includes(key))
      .map(([key, child]) => [key, stripSystemFields(child)]),
  );
};

const transformReferences = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(transformReferences);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, child]) => [
      key,
      key === '_ref' && typeof child === 'string' ? rekeyId(child) : transformReferences(child),
    ]),
  );
};

const collectReferences = (value: unknown, references: Set<string>) => {
  if (Array.isArray(value)) {
    value.forEach((child) => collectReferences(child, references));
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (key === '_ref' && typeof child === 'string' && (child.startsWith('migration.') || child.startsWith('migration-'))) {
      references.add(child);
    } else {
      collectReferences(child, references);
    }
  }
};

const reportIds = (documents: SanityDocument[]) => documents.map((document) => document._id).sort();

async function main() {
  const documents = await client.fetch<SanityDocument[]>('*[_type in $types]', {types: managedTypes});
  const published = documents.filter(isPublishedMigrationDocument);
  const drafts = documents.filter((document) => document._id.startsWith('drafts.'));
  const existingIds = new Map(documents.map((document) => [document._id, document]));
  const plan = published.map((document) => ({
    oldId: document._id,
    newId: rekeyId(document._id),
    document,
    nextDocument: {
      ...(transformReferences(document) as Record<string, unknown>),
      _id: rekeyId(document._id),
    } as SanityDocument,
  }));

  const collisions = plan.flatMap(({oldId, newId, nextDocument}) => {
    const existing = existingIds.get(newId);
    if (!existing || newId === oldId) return [];
    return JSON.stringify(stripSystemFields(existing)) === JSON.stringify(stripSystemFields(nextDocument))
      ? []
      : [`${newId} already exists with different content (source: ${oldId})`];
  });

  const finalIds = new Set([...documents.map((document) => rekeyId(document._id)), ...plan.map(({newId}) => newId)]);
  const references = new Set<string>();
  plan.forEach(({nextDocument}) => collectReferences(nextDocument, references));
  const brokenReferences = [...references].filter((reference) => !finalIds.has(reference) && !existingIds.has(reference));

  const slugRows = await client.fetch<Array<{_type: string; slug?: string}>>(
    '*[_type in $types && defined(slug.current)]{_type, "slug": slug.current}',
    {types: ['blogPost', 'product', 'productCategory']},
  );
  const slugCounts = new Map<string, number>();
  slugRows.forEach(({slug}) => slug && slugCounts.set(slug, (slugCounts.get(slug) ?? 0) + 1));
  const duplicateSlugs = [...slugCounts.entries()].filter(([, count]) => count > 1).map(([slug]) => slug);
  const imageCount = await client.fetch<number>('count(*[_type == "sanity.imageAsset"])');

  console.log(JSON.stringify({
    mode: writeMode ? 'write' : 'dry-run',
    projectId,
    dataset,
    apiVersion: API_VERSION,
    publishedDocuments: published.length,
    idPlan: plan.map(({oldId, newId}) => ({oldId, newId})),
    newIdsWithDots: plan.filter(({newId}) => newId.includes('.')).map(({newId}) => newId),
    collisions,
    brokenReferences,
    duplicateSlugs,
    imageCount,
    drafts: reportIds(drafts),
    unresolvedDrafts: drafts.length,
  }, null, 2));

  if (!writeMode) return;
  if (drafts.length || collisions.length || brokenReferences.length || duplicateSlugs.length) {
    throw new Error('Write blocked: resolve drafts, ID collisions, broken references, and duplicate slugs first.');
  }

  const newIds = plan.map(({newId}) => newId);
  const oldIds = plan.map(({oldId}) => oldId);
  const expectedTypeCounts = new Map<string, number>();
  plan.forEach(({document}) => expectedTypeCounts.set(document._type, (expectedTypeCounts.get(document._type) ?? 0) + 1));

  const verifyPublicDocuments = async (expectOldIds: boolean) => {
    const publicDocuments = await publicClient.fetch<SanityDocument[]>('*[_id in $ids]', {
      ids: expectOldIds ? oldIds : newIds,
    });
    const counts = new Map<string, number>();
    publicDocuments.forEach((document) => counts.set(document._type, (counts.get(document._type) ?? 0) + 1));
    const missing = newIds.filter((id) => !publicDocuments.some((document) => document._id === id));
    const wrongCounts = [...expectedTypeCounts].filter(([type, count]) => (counts.get(type) ?? 0) !== count);
    const references = new Set<string>();
    publicDocuments.forEach((document) => collectReferences(document, references));
    const publicIds = new Set(publicDocuments.map((document) => document._id));
    const missingReferences = [...references].filter((reference) => !publicIds.has(reference) && !newIds.includes(reference));
    return {
      ok: missing.length === 0 && wrongCounts.length === 0 && missingReferences.length === 0,
      count: publicDocuments.length,
      missing,
      wrongCounts,
      missingReferences,
    };
  };

  const createTransaction = client.transaction();
  plan.forEach(({nextDocument}) => createTransaction.createIfNotExists(nextDocument));
  await createTransaction.commit();

  let publicVerification: Awaited<ReturnType<typeof verifyPublicDocuments>> | undefined;
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    publicVerification = await verifyPublicDocuments(false);
    if (publicVerification.ok) break;
    await sleep(5000);
  }
  if (!publicVerification?.ok) {
    throw new Error(`Public verification failed; old documents were preserved. ${JSON.stringify(publicVerification)}`);
  }

  const deleteTransaction = client.transaction();
  oldIds.forEach((oldId) => deleteTransaction.delete(oldId));
  await deleteTransaction.commit();

  let deletionVerification: Awaited<ReturnType<typeof verifyPublicDocuments>> | undefined;
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    deletionVerification = await verifyPublicDocuments(false);
    const oldDocuments = await publicClient.fetch<SanityDocument[]>('*[_id in $ids]{_id}', {ids: oldIds});
    if (deletionVerification.ok && oldDocuments.length === 0) break;
    await sleep(5000);
  }
  const remainingOldDocuments = await publicClient.fetch<SanityDocument[]>('*[_id in $ids]{_id}', {ids: oldIds});
  if (!deletionVerification?.ok || remainingOldDocuments.length > 0) {
    throw new Error(`Post-delete verification failed. Remaining old documents: ${remainingOldDocuments.length}`);
  }

  console.log(JSON.stringify({rekeyed: plan.length, publicVerification, oldDocumentsRemaining: 0}, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Rekey failed.');
  process.exitCode = 1;
});
