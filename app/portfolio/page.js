import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPortfolioProjects, getContactContent } from "@/lib/content";

export const revalidate = 0;
export const metadata = { title: "Portfólio — Sofia Stradiotte" };

export default async function PortfolioPage() {
  const [projects, contact] = await Promise.all([
    getPortfolioProjects({ onlyPublished: true }),
    getContactContent(),
  ]);

  return (
    <div className="site-wrapper">
      <Navbar />

      <section className="section-header">
        <h1>Portfólio</h1>
        <p>Projetos e trabalhos acadêmicos de Moda.</p>
      </section>

      {projects.length === 0 ? (
        <p className="empty-state">Nenhum projeto publicado ainda. Volte em breve!</p>
      ) : (
        <section className="projects-grid">
          {projects.map((project) => (
            <Link href={`/portfolio/${project.id}`} className="project-card" key={project.id}>
              <div className="project-cover">
                {project.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.cover_image_url} alt={project.title} />
                ) : null}
              </div>
              <div className="project-body">
                {project.category ? <span className="project-category">{project.category}</span> : null}
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.project_date ? (
                  <span className="project-date">
                    {new Date(project.project_date).toLocaleDateString("pt-BR")}
                  </span>
                ) : null}
              </div>
            </Link>
          ))}
        </section>
      )}

      <Footer contact={contact} />
    </div>
  );
}
