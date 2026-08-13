import { getAboutContent } from "@/lib/content";
import SobreForm from "@/components/admin/SobreForm";

export const revalidate = 0;

export default async function AdminSobrePage() {
  const about = await getAboutContent();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Sobre Mim</h1>
          <p>Edite a biografia, formação, interesses e habilidades.</p>
        </div>
      </div>
      <SobreForm about={about} />
    </div>
  );
}
