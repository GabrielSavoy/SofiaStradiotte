import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getPortfolioProjects, getGalleryPhotos, getContactMessages } from "@/lib/content";

export const revalidate = 0;

export default async function DashboardHome() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [projects, photos, messages] = await Promise.all([
    getPortfolioProjects({ onlyPublished: false }),
    getGalleryPhotos(),
    getContactMessages(),
  ]);

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Olá, {user?.email?.split("@")[0] || "Sofia"} 👋</h1>
          <p>Aqui está um resumo do seu site.</p>
        </div>
        <Link href="/" target="_blank" className="btn-secondary">
          Ver site público ↗
        </Link>
      </div>

      <div className="field-row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="admin-card">
          <h2>Projetos no portfólio</h2>
          <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--accent-dark)" }}>
            {projects.length}
          </p>
          <Link href="/admin/dashboard/portfolio" className="btn-secondary btn-sm" style={{ marginTop: 10 }}>
            Gerenciar
          </Link>
        </div>
        <div className="admin-card">
          <h2>Fotos na galeria</h2>
          <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--accent-dark)" }}>
            {photos.length}
          </p>
          <Link href="/admin/dashboard/fotos" className="btn-secondary btn-sm" style={{ marginTop: 10 }}>
            Gerenciar
          </Link>
        </div>
        <div className="admin-card">
          <h2>Mensagens de contato</h2>
          <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--accent-dark)" }}>
            {messages.length}
            {unread > 0 ? <span className="badge unread" style={{ marginLeft: 10 }}>{unread} não lidas</span> : null}
          </p>
          <Link href="/admin/dashboard/contato" className="btn-secondary btn-sm" style={{ marginTop: 10 }}>
            Ver mensagens
          </Link>
        </div>
      </div>
    </div>
  );
}
