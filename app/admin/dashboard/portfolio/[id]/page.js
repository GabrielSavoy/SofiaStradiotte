import { notFound } from "next/navigation";
import { getPortfolioProject } from "@/lib/content";
import EditProjetoForm from "@/components/admin/EditProjetoForm";
import ProjectImagesManager from "@/components/admin/ProjectImagesManager";

export const revalidate = 0;

export default async function EditProjetoPage({ params }) {
  const project = await getPortfolioProject(params.id);
  if (!project) notFound();

  const images = (project.portfolio_images || []).sort((a, b) => a.order_index - b.order_index);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Editar projeto</h1>
          <p>{project.title}</p>
        </div>
      </div>
      <EditProjetoForm project={project} />
      <ProjectImagesManager projectId={project.id} images={images} />
    </div>
  );
}
