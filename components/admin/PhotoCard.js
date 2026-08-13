"use client";

import { useState } from "react";
import { updatePhotoDetails, deletePhoto, movePhoto } from "@/app/admin/dashboard/fotos/actions";

export default function PhotoCard({ photo, index = 0, total = 1 }) {
  const [title, setTitle] = useState(photo.title || "");
  const [caption, setCaption] = useState(photo.caption || "");

  return (
    <div className="admin-photo-card">
      <div className="ph">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.image_url} alt={photo.title || ""} />
      </div>
      <div className="ph-body">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="order-buttons" style={{ flexDirection: "row" }}>
            <form action={movePhoto}>
              <input type="hidden" name="id" value={photo.id} />
              <input type="hidden" name="direction" value="up" />
              <button type="submit" disabled={index === 0}>◀</button>
            </form>
            <form action={movePhoto}>
              <input type="hidden" name="id" value={photo.id} />
              <input type="hidden" name="direction" value="down" />
              <button type="submit" disabled={index === total - 1}>▶</button>
            </form>
          </div>
        </div>
        <form action={updatePhotoDetails} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <input type="hidden" name="id" value={photo.id} />
          <input
            name="title"
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "6px 8px", fontSize: "0.78rem" }}
          />
          <input
            name="caption"
            type="text"
            placeholder="Legenda"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "6px 8px", fontSize: "0.78rem" }}
          />
          <button type="submit" className="btn-secondary btn-sm">Salvar</button>
        </form>
        <form action={deletePhoto}>
          <input type="hidden" name="id" value={photo.id} />
          <input type="hidden" name="image_url" value={photo.image_url} />
          <button type="submit" className="btn-danger btn-sm" style={{ width: "100%" }}>
            Excluir
          </button>
        </form>
      </div>
    </div>
  );
}
