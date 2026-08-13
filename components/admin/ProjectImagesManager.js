"use client";

import { useFormStatus } from "react-dom";
import { addProjectImages, deleteProjectImage } from "@/app/admin/dashboard/portfolio/actions";

function AddButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-secondary btn-sm" disabled={pending}>
      {pending ? "Enviando..." : "Adicionar imagens"}
    </button>
  );
}

export default function ProjectImagesManager({ projectId, images }) {
  return (
    <div className="admin-card">
      <h2>Imagens do projeto</h2>

      {images.length === 0 ? (
        <p className="field-hint" style={{ marginBottom: 14 }}>Nenhuma imagem extra adicionada ainda.</p>
      ) : (
        <div className="admin-photo-grid" style={{ marginBottom: 16 }}>
          {images.map((img) => (
            <div className="admin-photo-card" key={img.id}>
              <div className="ph">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.image_url} alt="" />
              </div>
              <div className="ph-body">
                <form action={deleteProjectImage}>
                  <input type="hidden" name="image_id" value={img.id} />
                  <input type="hidden" name="project_id" value={projectId} />
                  <input type="hidden" name="image_url" value={img.image_url} />
                  <button type="submit" className="btn-danger btn-sm" style={{ width: "100%" }}>
                    Excluir
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}

      <form action={addProjectImages} className="upload-dropzone">
        <input type="hidden" name="project_id" value={projectId} />
        <p>Selecione uma ou mais imagens para adicionar a este projeto.</p>
        <input type="file" name="images" accept="image/*" multiple />
        <div style={{ marginTop: 12 }}>
          <AddButton />
        </div>
      </form>
    </div>
  );
}
