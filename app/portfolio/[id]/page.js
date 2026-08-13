import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPortfolioProject, getContactContent } from "@/lib/content";

export const revalidate = 0;

export default async function ProjectPage({ params }) {
  const [project, contact] = await Promise.all([
    getPortfolioProject(params.id),
    getContactContent(),
  ]);

  if (!project || !project.published) {
    notFound();
  }

  const images = (project.portfolio_images || []).sort(
    (a, b) => a.order_index - b.order_index
  );

  return (
    <div className="site-wrapper">
      <Navbar />

      <section className="section-header">
        {project.category ? <span className="project-category">{project.category}</span> : null}
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.1rem", color: "var(--text-dark)" }}>
          {project.title}
        </h1>
        <p>{project.description}</p>
      </section>

      <section className="gallery-grid" style={{ paddingTop: 0 }}>
        {project.cover_image_url ? (
          <div className="gallery-item">
            <div className="gallery-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.cover_image_url} alt={project.title} />
            </div>
          </div>
        ) : null}
        {images.map((img) => (
          <div className="gallery-item" key={img.id}>
            <div className="gallery-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.image_url} alt={project.title} />
            </div>
          </div>
        ))}
      </section>

      <Footer contact={contact} />
    </div>
  );
}
