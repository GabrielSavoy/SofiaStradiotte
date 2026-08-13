import { requireUser } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Painel — Sofia Stradiotte" };

export default async function DashboardLayout({ children }) {
  const user = await requireUser();

  return (
    <div className="admin-shell">
      <AdminSidebar userEmail={user.email} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
