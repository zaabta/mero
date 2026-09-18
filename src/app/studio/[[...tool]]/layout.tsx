import SanityDirection from '@/components/SanityDirection';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="ltr" lang="en" className="sanity-studio-shell">
      <SanityDirection />
      {children}
    </div>
  );
}
