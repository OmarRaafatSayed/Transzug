// Dashboard layout — thin wrapper.
// The sidebar and tab state live inside page.tsx (client component)
// so they can share state without prop drilling through a server layout.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
