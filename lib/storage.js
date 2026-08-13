import { createClient } from "@/lib/supabase/server";

const BUCKET_IMAGES = "site-images";
const BUCKET_DOCS = "site-documents";

function slugifyFileName(name) {
  const parts = name.split(".");
  const ext = parts.length > 1 ? parts.pop() : "";
  const base = parts
    .join(".")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const unique = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  return `${base || "arquivo"}-${unique}${ext ? "." + ext : ""}`;
}

// Faz upload de uma imagem (vinda de um <input type="file"> dentro de uma
// Server Action) para o bucket público site-images e devolve a URL pública.
// Só é chamado depois que a Server Action já validou o usuário autenticado
// (ver lib/auth.js), então a escrita respeita a política de RLS do storage.
export async function uploadImage(file, folder = "geral") {
  if (!file || typeof file === "string" || file.size === 0) return null;

  const supabase = createClient();
  const path = `${folder}/${slugifyFileName(file.name)}`;

  const { error } = await supabase.storage.from(BUCKET_IMAGES).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET_IMAGES).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadDocument(file, folder = "curriculo") {
  if (!file || typeof file === "string" || file.size === 0) return null;

  const supabase = createClient();
  const path = `${folder}/${slugifyFileName(file.name)}`;

  const { error } = await supabase.storage.from(BUCKET_DOCS).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET_DOCS).getPublicUrl(path);
  return data.publicUrl;
}

// Remove um arquivo a partir da URL pública salva no banco (best-effort —
// se o storage já não tiver o objeto, apenas ignora o erro).
export async function deleteFileByUrl(publicUrl, bucket = BUCKET_IMAGES) {
  if (!publicUrl) return;
  const marker = `/object/public/${bucket}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return;
  const path = publicUrl.slice(idx + marker.length);

  const supabase = createClient();
  await supabase.storage.from(bucket).remove([path]);
}
