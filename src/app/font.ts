import localFont from 'next/font/local';

export const cairo = localFont({
  src: [
    {path: '../assets/fonts/cairo/Cairo-Regular.woff2', weight: '400', style: 'normal'},
    {path: '../assets/fonts/cairo/Cairo-Medium.woff2', weight: '500', style: 'normal'},
    {path: '../assets/fonts/cairo/Cairo-SemiBold.woff2', weight: '600', style: 'normal'},
    {path: '../assets/fonts/cairo/Cairo-Bold.woff2', weight: '700', style: 'normal'}
  ],
  variable: '--font-cairo',
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'sans-serif']
});
