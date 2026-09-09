"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { getAboutContent, saveSiteContent } from "@/lib/content";
import { uploadImage, deleteFileByUrl } from "@/lib/storage";

export async function saveAbout(prevState, formData) {
  await requireUser();

  const current = await getAboutContent();
  const imageFile = formData.get("image");
  const removeImage = formData.get("image_remove") === "1";

  let imageUrl = current.image_url;
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage(imageFile, "sobre");
    if (current.image_url) await deleteFileByUrl(current.image_url);
  } else if (removeImage) {
    if (current.image_url) await deleteFileByUrl(current.image_url);
    imageUrl = null;
  }

  const skillsRaw = (formData.get("skills") || "").toString();
  const skills = skillsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const data = {
    heading: formData.get("heading") || current.heading,
    bio: formData.get("bio") || "",
    formation: formData.get("formation") || "",
    interests: formData.get("interests") || "",
    skills,
    image_url: imageUrl,
  };

  await saveSiteContent("about", data);
  revalidatePath("/sobre");
  revalidatePath("/admin/dashboard/sobre");

  return { status: "success", message: "Página Sobre Mim atualizada!" };
}
