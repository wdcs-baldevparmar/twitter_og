import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Twitter OG Demo',
  description: 'Dynamic OpenGraph/Twitter image + Share Intent demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
