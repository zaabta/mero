import type { Metadata } from 'next';
import NotFoundPage from '../components/errors/NotFoundPage';

export const metadata: Metadata = {
  title: 'Page not found | Mero',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundPage locale="ar" />;
}
