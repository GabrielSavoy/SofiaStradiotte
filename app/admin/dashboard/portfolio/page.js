import Link from "next/link";
import { getPortfolioProjects } from "@/lib/content";
import { togglePublish, moveProject, deleteProject } from "./actions";

export const revalidate = 0;

export default async function AdminPortfolioPage() {
  const projects = await getPortfolioProjects({ onlyPublished: false });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Portfólio</h1>
          <p>Crie, edite e organize os projetos que aparecem no site.</p>
        </div>
        <Link href="/admin/dashboard/portfolio/novo" className="btn-primary">
          + Novo projeto
        </Link>
      </div>

      <div className="admin-card">
        {projects.length === 0 ? (
          <p className="empty-admin">Nenhum projeto ainda. Clique em "Novo projeto" para começar.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Projeto</th>
                  <th>Categoria</th>
                  <th>Status</th>
                  <th>Ordem</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, i) => (
                  <tr key={project.id}>
                    <td>
                      {project.cover_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.cover_image_url} alt="" className="thumb" />
                      ) : (
                        <div className="thumb" />
                      )}
                    </td>
                    <td>{project.title}</td>
                    <td>{project.category || "—"}</td>
                    <td>
                      <form action={togglePublish}>
                        <input type="hidden" name="id" value={project.id} />
                        <input type="hidden" name="published" value={String(project.published)} />
                        <button type="submit" style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}>
                          <span className={`badge ${project.published ? "published" : "draft"}`}>
                            {project.published ? "Publicado" : "Rascunho"}
                          </span>
                        </button>
                      </form>
                    </td>
                    <td>
                      <div className="order-buttons">
                        <form action={moveProject}>
                          <input type="hidden" name="id" value={project.id} />
                          <input type="hidden" name="direction" value="up" />
                          <button type="submit" disabled={i === 0}>▲</button>
                        </form>
                        <form action={moveProject}>
                          <input type="hidden" name="id" value={project.id} />
                          <input type="hidden" name="direction" value="down" />
                          <button type="submit" disabled={i === projects.length - 1}>▼</button>
                        </form>
                      </div>
                    </td>
                    <td>
                      <div className="row-actions">
                        <Link href={`/admin/dashboard/portfolio/${project.id}`} className="btn-secondary btn-sm">
                          Editar
                        </Link>
                        <form action={deleteProject}>
                          <input type="hidden" name="id" value={project.id} />
                          <button type="submit" className="btn-danger btn-sm">
                            Excluir
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
