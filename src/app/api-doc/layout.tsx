import type { Metadata } from 'next';
import '../globals.css';
import 'swagger-ui-react/swagger-ui.css';

export const metadata: Metadata = {
  title: 'API Documentation — tranzug Store',
  description:
    'Interactive OpenAPI 3.0 documentation for the tranzug Store API, mirroring the official spec.',
};

export default function ApiDocLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
