import { getGalleryPhotos } from "@/lib/content";
import { addPhotos } from "./actions";
import PhotoCard from "@/components/admin/PhotoCard";

export const revalidate = 0;

export default async function AdminFotosPage() {
  const photos = await getGalleryPhotos();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Fotos</h1>
          <p>Adicione, organize e edite a galeria de fotos do site.</p>
        </div>
      </div>

      <div className="admin-card">
        <h2>Adicionar fotos</h2>
        <form action={addPhotos} className="upload-dropzone">
          <p>Selecione uma ou mais imagens.</p>
          <input type="file" name="photos" accept="image/*" multiple required />
          <div style={{ marginTop: 12 }}>
            <button type="submit" className="btn-primary">Enviar</button>
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h2>Fotos da galeria ({photos.length})</h2>
        {photos.length === 0 ? (
          <p className="empty-admin">Nenhuma foto adicionada ainda.</p>
        ) : (
          <div className="admin-photo-grid">
            {photos.map((photo, i) => (
              <PhotoCard photo={photo} index={i} total={photos.length} key={photo.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
