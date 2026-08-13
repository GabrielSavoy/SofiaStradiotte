"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getGalleryPhotos } from "@/lib/content";
import { uploadImage, deleteFileByUrl } from "@/lib/storage";

export async function addPhotos(formData) {
  await requireUser();
  const supabase = createClient();
  const files = formData.getAll("photos").filter((f) => f && f.size > 0);

  const existing = await getGalleryPhotos();
  let nextOrder = existing.length;

  for (const file of files) {
    const url = await uploadImage(file, "galeria");
    await supabase.from("gallery_photos").insert({
      image_url: url,
      order_index: nextOrder++,
    });
  }

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
