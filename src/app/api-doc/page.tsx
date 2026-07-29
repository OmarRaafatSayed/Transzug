'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import SwaggerUI to avoid SSR issues
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocPage() {
  const [spec, setSpec] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/swagger')
      .then((res) => res.json())
      .then((data) => setSpec(data))
      .catch(() => setError('Failed to load API specification.'));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0d1424] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">
              tranzug — Store API Docs
            </h1>
            <p className="mt-0.5 text-sm text-white/50">
              Local implementation · Mirrors{' '}
              <a
                href="https://api-tranzug.it-trendco.de/swagger/store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:text-brand-hover hover:underline"
              >
                official spec
              </a>
            </p>
          </div>
          <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand-primary ring-1 ring-brand-light">
            OAS 3.0
          </span>
        </div>
      </div>

      {/* Swagger UI */}
      <div className="swagger-dark-wrapper">
        {error && (
          <div className="mx-auto max-w-7xl px-6 py-10 text-center text-red-400">
            {error}
          </div>
        )}
        {!spec && !error && (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
            <span className="ml-3 text-white/50">Loading API spec…</span>
          </div>
        )}
        {spec && <SwaggerUI spec={spec} docExpansion="list" deepLinking tryItOutEnabled />}
      </div>

      {/* Dark theme override styles */}
      <style>{`
        /* ── Base ── */
        .swagger-dark-wrapper .swagger-ui {
          font-family: 'Geist', ui-sans-serif, system-ui, sans-serif;
        }

        /* Topbar hidden (we have our own header) */
        .swagger-dark-wrapper .swagger-ui .topbar { display: none; }

        /* Main backgrounds */
        .swagger-dark-wrapper .swagger-ui,
        .swagger-dark-wrapper .swagger-ui .wrapper,
        .swagger-dark-wrapper .swagger-ui .information-container,
        .swagger-dark-wrapper .swagger-ui .scheme-container {
          background: #0a0f1a;
          color: #e2e8f0;
        }

        /* Info block */
        .swagger-dark-wrapper .swagger-ui .info hgroup.main {
          margin: 24px 0 8px;
        }
        .swagger-dark-wrapper .swagger-ui .info .title {
          color: #f8fafc;
          font-size: 1.75rem;
          font-weight: 700;
        }
        .swagger-dark-wrapper .swagger-ui .info p,
        .swagger-dark-wrapper .swagger-ui .info li,
        .swagger-dark-wrapper .swagger-ui .info .description {
          color: #94a3b8;
        }
        .swagger-dark-wrapper .swagger-ui .info a {
          color: #f97316;
        }

        /* Authorize button */
        .swagger-dark-wrapper .swagger-ui .btn.authorize {
          background: transparent;
          border: 1px solid #f97316;
          color: #f97316;
          border-radius: 6px;
          font-weight: 600;
        }
        .swagger-dark-wrapper .swagger-ui .btn.authorize:hover {
          background: #f9731615;
        }
        .swagger-dark-wrapper .swagger-ui .btn.authorize svg {
          fill: #f97316;
        }

        /* Tag headings */
        .swagger-dark-wrapper .swagger-ui .opblock-tag {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: #f8fafc;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .swagger-dark-wrapper .swagger-ui .opblock-tag:hover {
          background: rgba(255,255,255,0.03);
        }
        .swagger-dark-wrapper .swagger-ui .opblock-tag small {
          color: #64748b;
          font-weight: 400;
        }

        /* Operation blocks */
        .swagger-dark-wrapper .swagger-ui .opblock {
          background: #0d1424;
          border-color: rgba(255,255,255,0.08);
          border-radius: 8px;
          margin-bottom: 8px;
          box-shadow: none;
        }
        .swagger-dark-wrapper .swagger-ui .opblock .opblock-summary {
          border-color: rgba(255,255,255,0.08);
        }
        .swagger-dark-wrapper .swagger-ui .opblock .opblock-summary:hover {
          background: rgba(255,255,255,0.03);
        }
        .swagger-dark-wrapper .swagger-ui .opblock-summary-description {
          color: #94a3b8;
        }

        /* HTTP method badges */
        .swagger-dark-wrapper .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #2563eb; }
        .swagger-dark-wrapper .swagger-ui .opblock.opblock-post .opblock-summary-method { background: #16a34a; }
        .swagger-dark-wrapper .swagger-ui .opblock.opblock-put .opblock-summary-method { background: #d97706; }
        .swagger-dark-wrapper .swagger-ui .opblock.opblock-delete .opblock-summary-method { background: #dc2626; }
        .swagger-dark-wrapper .swagger-ui .opblock.opblock-patch .opblock-summary-method { background: #7c3aed; }

        /* Highlighted GET/POST/etc label bg */
        .swagger-dark-wrapper .swagger-ui .opblock.opblock-get { border-color: #2563eb40; background: #0d1424; }
        .swagger-dark-wrapper .swagger-ui .opblock.opblock-post { border-color: #16a34a40; background: #0d1424; }
        .swagger-dark-wrapper .swagger-ui .opblock.opblock-put { border-color: #d9770640; background: #0d1424; }
        .swagger-dark-wrapper .swagger-ui .opblock.opblock-delete { border-color: #dc262640; background: #0d1424; }

        /* Operation body */
        .swagger-dark-wrapper .swagger-ui .opblock .opblock-body {
          background: #111827;
        }
        .swagger-dark-wrapper .swagger-ui .opblock .opblock-section-header {
          background: #0f172a;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .swagger-dark-wrapper .swagger-ui .opblock .opblock-section-header h4,
        .swagger-dark-wrapper .swagger-ui .opblock .opblock-section-header label {
          color: #e2e8f0;
        }

        /* Parameters table */
        .swagger-dark-wrapper .swagger-ui table tbody tr td {
          background: transparent;
          border-color: rgba(255,255,255,0.06);
          color: #cbd5e1;
        }
        .swagger-dark-wrapper .swagger-ui table thead tr th {
          background: #0f172a;
          border-color: rgba(255,255,255,0.08);
          color: #94a3b8;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .swagger-dark-wrapper .swagger-ui .parameter__name,
        .swagger-dark-wrapper .swagger-ui .parameter__name.required:after {
          color: #f8fafc;
        }
        .swagger-dark-wrapper .swagger-ui .parameter__name.required:after {
          color: #f97316;
        }
        .swagger-dark-wrapper .swagger-ui .parameter__type {
          color: #818cf8;
        }
        .swagger-dark-wrapper .swagger-ui .parameter__in {
          color: #6b7280;
          font-style: italic;
        }

        /* Inputs */
        .swagger-dark-wrapper .swagger-ui input[type=text],
        .swagger-dark-wrapper .swagger-ui input[type=email],
        .swagger-dark-wrapper .swagger-ui input[type=password],
        .swagger-dark-wrapper .swagger-ui textarea,
        .swagger-dark-wrapper .swagger-ui select {
          background: #1e293b;
          border: 1px solid rgba(255,255,255,0.12);
          color: #f1f5f9;
          border-radius: 4px;
        }
        .swagger-dark-wrapper .swagger-ui input[type=text]:focus,
        .swagger-dark-wrapper .swagger-ui textarea:focus {
          border-color: #f97316;
          outline: none;
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15);
        }

        /* Execute/Try it out buttons */
        .swagger-dark-wrapper .swagger-ui .btn.execute {
          background: #f97316;
          border-color: #f97316;
          color: #fff;
          border-radius: 6px;
          font-weight: 600;
        }
        .swagger-dark-wrapper .swagger-ui .btn.execute:hover {
          background: #ea6a0a;
        }
        .swagger-dark-wrapper .swagger-ui .btn.try-out__btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: #94a3b8;
          border-radius: 6px;
        }
        .swagger-dark-wrapper .swagger-ui .btn.try-out__btn.cancel {
          border-color: #ef4444;
          color: #ef4444;
        }

        /* Response section */
        .swagger-dark-wrapper .swagger-ui .responses-wrapper,
        .swagger-dark-wrapper .swagger-ui .response-col_status {
          color: #94a3b8;
        }
        .swagger-dark-wrapper .swagger-ui .response-col_description__inner p {
          color: #94a3b8;
        }
        .swagger-dark-wrapper .swagger-ui .highlight-code {
          background: #0f172a;
        }
        .swagger-dark-wrapper .swagger-ui .highlight-code pre {
          background: #0f172a !important;
          color: #e2e8f0;
        }
        .swagger-dark-wrapper .swagger-ui .microlight {
          background: #0f172a;
          color: #e2e8f0;
        }

        /* Copy button */
        .swagger-dark-wrapper .swagger-ui .copy-to-clipboard {
          background: #1e293b;
        }

        /* Response codes */
        .swagger-dark-wrapper .swagger-ui .response .response-col_status { color: #6ee7b7; }
        .swagger-dark-wrapper .swagger-ui table.responses-table td.response-col_status { color: #6ee7b7; }

        /* Schema section */
        .swagger-dark-wrapper .swagger-ui section.models {
          border: 1px solid rgba(255,255,255,0.08);
          background: #0d1424;
          border-radius: 8px;
        }
        .swagger-dark-wrapper .swagger-ui section.models h4 {
          color: #f8fafc;
        }
        .swagger-dark-wrapper .swagger-ui section.models .model-container {
          background: #111827;
          border-color: rgba(255,255,255,0.06);
        }
        .swagger-dark-wrapper .swagger-ui .model-title {
          color: #f8fafc;
        }
        .swagger-dark-wrapper .swagger-ui .model .property {
          color: #94a3b8;
        }
        .swagger-dark-wrapper .swagger-ui .model .prop-type {
          color: #818cf8;
        }
        .swagger-dark-wrapper .swagger-ui .model-box {
          background: #0f172a;
        }
        .swagger-dark-wrapper .swagger-ui span.prop-format {
          color: #64748b;
        }

        /* Arrows / chevrons */
        .swagger-dark-wrapper .swagger-ui .expand-operation svg,
        .swagger-dark-wrapper .swagger-ui .arrow {
          fill: #64748b;
        }

        /* Auth modal */
        .swagger-dark-wrapper .swagger-ui .dialog-ux .modal-ux {
          background: #0d1424;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
        }
        .swagger-dark-wrapper .swagger-ui .dialog-ux .modal-ux-header {
          background: #0f172a;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .swagger-dark-wrapper .swagger-ui .dialog-ux .modal-ux-header h3 {
          color: #f8fafc;
        }
        .swagger-dark-wrapper .swagger-ui .dialog-ux .modal-ux-content {
          color: #94a3b8;
        }
        .swagger-dark-wrapper .swagger-ui .dialog-ux .modal-ux-content label {
          color: #cbd5e1;
        }

        /* Scrollbar */
        .swagger-dark-wrapper ::-webkit-scrollbar { width: 6px; height: 6px; }
        .swagger-dark-wrapper ::-webkit-scrollbar-track { background: #0a0f1a; }
        .swagger-dark-wrapper ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        .swagger-dark-wrapper ::-webkit-scrollbar-thumb:hover { background: #475569; }

        /* External docs link */
        .swagger-dark-wrapper .swagger-ui .info .base-url { color: #64748b; }
        .swagger-dark-wrapper .swagger-ui .scheme-container { background: #0a0f1a; padding: 16px 0; box-shadow: none; }
      `}</style>
    </div>
  );
}
