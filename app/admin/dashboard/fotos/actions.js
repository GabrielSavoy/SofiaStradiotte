"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getGalleryPhotos } from "@/lib/content";
import { deleteFileByUrl } from "@/lib/storage";

// Recebe URLs de fotos já enviadas direto do navegador para o Storage
// (ver components/admin/PhotoUploader.js) e só grava no banco.
export async function registerPhotos(urls) {
  await requireUser();
  const supabase = createClient();
  const list = (Array.isArray(urls) ? urls : []).filter((u) => typeof u === "string" && u);
  if (!list.length) return;

  // Fotos novas entram no começo: ficam antes da menor posição atual.
  const existing = await getGalleryPhotos();
  const first = existing.length ? existing[0].order_index : 0;
  const start = first - list.length;

  await supabase.from("gallery_photos").insert(
    list.map((image_url, i) => ({ image_url, order_index: start + i }))
  );

  revalidatePath("/fotos");
  revalidatePath("/admin/dashboard/fotos");
}

export async function updatePhotoDetails(formData) {
  await requireUser();
  const supabase = createClient();
  const id = formData.get("id");

  await supabase
    .from("gallery_photos")
    .update({
      title: formData.get("title") || "",
      caption: formData.get("caption") || "",
    })
    .eq("id", id);

  revalidatePath("/fotos");
  revalidatePath("/admin/dashboard/fotos");
}

export async function deletePhoto(formData) {
  await requireUser();
  const supabase = createClient();
  const id = formData.get("id");
  const imageUrl = formData.get("image_url");

  await supabase.from("gallery_photos").delete().eq("id", id);
  if (imageUrl) await deleteFileByUrl(imageUrl.toString());

  revalidatePath("/fotos");
  revalidatePath("/admin/dashboard/fotos");
}

export async function movePhoto(formData) {
  await requireUser();
  const supabase = createClient();
  const id = formData.get("id");
  const direction = formData.get("direction");

  const photos = await getGalleryPhotos();
  const index = photos.findIndex((p) => p.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;

  if (index === -1 || swapWith < 0 || swapWith >= photos.length) return;

  const a = photos[index];
  const b = photos[swapWith];

  await supabase.from("gallery_photos").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("gallery_photos").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/fotos");
  revalidatePath("/admin/dashboard/fotos");
}

export async function reorderPhotos(ids) {
  await requireUser();
  const supabase = createClient();
  if (!Array.isArray(ids)) return;

  await Promise.all(
    ids.map((id, i) => supabase.from("gallery_photos").update({ order_index: i }).eq("id", id))
  );

  revalidatePath("/fotos");
  revalidatePath("/admin/dashboard/fotos");
}
