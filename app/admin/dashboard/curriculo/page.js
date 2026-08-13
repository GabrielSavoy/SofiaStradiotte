import { getResumeContent } from "@/lib/content";
import CurriculoForm from "@/components/admin/CurriculoForm";

export const revalidate = 0;

export default async function AdminCurriculoPage() {
  const resume = await getResumeContent();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Currículo</h1>
          <p>Formação, experiência, cursos, habilidades e o PDF para download.</p>
        </div>
      </div>
      <CurriculoForm resume={resume} />
    </div>
  );
}
