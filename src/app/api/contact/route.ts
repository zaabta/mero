import { NextResponse } from 'next/server';

type ContactPayload = Record<string, FormDataEntryValue | undefined>;

const attempts = new Map<string, { count: number; resetAt: number }>();
const windowMs = 15 * 60 * 1000;
const maxAttempts = 5;

function clean(value: FormDataEntryValue | undefined, maxLength: number) {
  return typeof value === 'string' ? value.trim().replace(/[<>]/g, '').slice(0, maxLength) : '';
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && current.resetAt > now && current.count >= maxAttempts) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }
  attempts.set(
    ip,
    current && current.resetAt > now
      ? { count: current.count + 1, resetAt: current.resetAt }
      : { count: 1, resetAt: now + windowMs },
  );

  const body = (await request.json().catch(() => null)) as ContactPayload | null;
  const fullName = clean(body?.fullName, 120);
  const phone = clean(body?.phone, 40);
  const country = clean(body?.country, 40);
  const product = clean(body?.product, 40);
  const message = clean(body?.message, 2000);
  const website = clean(body?.website, 100);
  const privacyConsent = clean(body?.privacyConsent, 10);

  if (website) return NextResponse.json({ message: 'Request rejected.' }, { status: 400 });
  const validProducts = new Set(['tires', 'batteries', 'oils', 'filters', 'wholesale']);
  if (
    !fullName ||
    !phone ||
    country !== 'sa' ||
    !validProducts.has(product) ||
    privacyConsent !== 'on'
  ) {
    return NextResponse.json({ message: 'Please complete all required fields.' }, { status: 400 });
  }
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.CONTACT_TO_EMAIL ||
    !process.env.CONTACT_FROM_EMAIL
  ) {
    return NextResponse.json(
      { message: 'Contact delivery is not configured yet.' },
      { status: 503 },
    );
  }

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      subject: `Mero quote request: ${product}`,
      text: `Name: ${fullName}\nPhone: ${phone}\nCountry: Saudi Arabia\nProduct: ${product}\nMessage: ${message || '(none)'}`,
    }),
  });
  if (!emailResponse.ok)
    return NextResponse.json({ message: 'We could not send your request.' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
