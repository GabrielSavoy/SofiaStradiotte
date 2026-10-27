"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { registerPhotos } from "@/app/admin/dashboard/fotos/actions";

const BUCKET = "site-images";
const MAX_SIDE = 2000;
const QUALITY = 0.85;
const CONCURRENCY = 4;

// Reduz a foto no navegador antes de enviar (fotos de celular têm 5–15 MB).
async function compress(file) {
  if (!/^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", QUALITY));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

function makePath(name, isJpeg) {
  const base = name.replace(/\.[^.]+$/, "").toLowerCase().normalize("NFD")
    .replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "foto";
  const ext = isJpeg ? "jpg" : (name.split(".").pop() || "jpg").toLowerCase();
  return `galeria/${base}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}.${ext}`;
}

export default function PhotoUploader() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const files = Array.from(form.photos.files || []);
    if (!files.length) return;

    setBusy(true);
    const supabase = createClient();
    const urls = new Array(files.length);
    let done = 0;
    let failed = 0;
    setStatus(`Enviando 0 de ${files.length}…`);

    let next = 0;
    async function worker() {
      while (next < files.length) {
        const i = next++;
        try {
          const blob = await compress(files[i]);
          const path = makePath(files[i].name, blob.type === "image/jpeg");
          const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
            cacheControl: "3600",
            contentType: blob.type || files[i].type,
          });
          if (error) throw error;
          urls[i] = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
        } catch (err) {
          console.error(err);
          failed++;
        }
        done++;
        setStatus(`Enviando ${done} de ${files.length}…`);
      }
    }
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));

    const ok = urls.filter(Boolean);
    if (ok.length) await registerPhotos(ok);

    setStatus(failed ? `${ok.length} enviadas, ${failed} falharam.` : `${ok.length} foto(s) enviada(s)!`);
    form.reset();
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} className="upload-dropzone">
      <p>Selecione uma ou mais imagens.</p>
      <input type="file" name="photos" accept="image/*" multiple required disabled={busy} />
      <div style={{ marginTop: 12 }}>
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? "Enviando…" : "Enviar"}
        </button>
      </div>
      {status && <p style={{ marginTop: 10 }}>{status}</p>}
    </form>
  );
}
