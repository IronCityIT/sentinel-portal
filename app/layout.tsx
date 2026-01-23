import { UserProvider } from '@auth0/nextjs-auth0/client';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata = {
  title: 'ICIT Sentinel - Security Intelligence Platform',
  description: 'Enterprise-grade SIEM for SMBs. 24/7 threat detection with dedicated CISO support.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icit-sentinel-icon.svg" />
      </head>
      <body>
        <UserProvider>
          {children}
        </UserProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
