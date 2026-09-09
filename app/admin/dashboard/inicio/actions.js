"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { getHomeContent, saveSiteContent } from "@/lib/content";
import { uploadImage, deleteFileByUrl } from "@/lib/storage";

export async function saveHome(prevState, formData) {
  await requireUser();

  const current = await getHomeContent();

  const heroFile = formData.get("hero_image");
  const profileFile = formData.get("profile_photo");
  const removeHero = formData.get("hero_image_remove") === "1";
  const removeProfile = formData.get("profile_photo_remove") === "1";

  let heroUrl = current.hero_image_url;
  if (heroFile && heroFile.size > 0) {
    heroUrl = await uploadImage(heroFile, "home");
    if (current.hero_image_url) await deleteFileByUrl(current.hero_image_url);
  } else if (removeHero) {
    if (current.hero_image_url) await deleteFileByUrl(current.hero_image_url);
    heroUrl = null;
  }

  let profileUrl = current.profile_photo_url;
  if (profileFile && profileFile.size > 0) {
    profileUrl = await uploadImage(profileFile, "home");
    if (current.profile_photo_url) await deleteFileByUrl(current.profile_photo_url);
  } else if (removeProfile) {
    if (current.profile_photo_url) await deleteFileByUrl(current.profile_photo_url);
    profileUrl = null;
  }

  const cards = current.cards.map((card, i) => ({
    title: formData.get(`card_title_${i}`) || card.title,
    description: formData.get(`card_description_${i}`) || card.description,
    href: formData.get(`card_href_${i}`) || card.href,
  }));

  const data = {
    eyebrow: formData.get("eyebrow") || current.eyebrow,
    name: formData.get("name") || current.name,
    description: formData.get("description") || current.description,
    cta_label: formData.get("cta_label") || current.cta_label,
    hero_image_url: heroUrl,
    profile_photo_url: profileUrl,
    cards,
  };

  await saveSiteContent("home", data);
  revalidatePath("/");
  revalidatePath("/admin/dashboard/inicio");

  return { status: "success", message: "Página inicial atualizada!" };
}
