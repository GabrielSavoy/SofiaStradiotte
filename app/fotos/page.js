import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGalleryPhotos, getContactContent } from "@/lib/content";

export const revalidate = 0;
export const metadata = { title: "Fotos — Sofia Stradiotte" };

export default async function FotosPage() {
  const [photos, contact] = await Promise.all([getGalleryPhotos(), getContactContent()]);

  return (
    <div className="site-wrapper">
      <Navbar />

      <section className="section-header">
        <h1>Fotos</h1>
        <p>Uma seleção de fotos e registros que inspiram a Sofia.</p>
      </section>

      {photos.length === 0 ? (
        <p className="empty-state">Nenhuma foto adicionada ainda.</p>
      ) : (
        <section className="gallery-grid">
          {photos.map((photo) => (
            <div className="gallery-item" key={photo.id}>
              <div className="gallery-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.image_url} alt={photo.title || "Foto"} />
              </div>
              {(photo.title || photo.caption) && (
                <div className="gallery-caption">
                  {photo.title ? <p className="g-title">{photo.title}</p> : null}
                  {photo.caption ? <p className="g-caption">{photo.caption}</p> : null}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      <Footer contact={contact} />
    </div>
  );
}
