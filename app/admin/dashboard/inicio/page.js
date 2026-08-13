import { getHomeContent } from "@/lib/content";
import InicioForm from "@/components/admin/InicioForm";

export const revalidate = 0;

export default async function AdminInicioPage() {
  const home = await getHomeContent();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Página Inicial</h1>
          <p>Edite o texto, as imagens e os cards da home.</p>
        </div>
      </div>
      <InicioForm home={home} />
    </div>
  );
}
