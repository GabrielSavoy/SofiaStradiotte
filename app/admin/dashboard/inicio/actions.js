"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { getHomeContent, saveSiteContent } from "@/lib/content";
import { uploadImage } from "@/lib/storage";

export async function saveHome(prevState, formData) {
  await requireUser();

  const current = await getHomeContent();

  const heroFile = formData.get("hero_image");
  const profileFile = formData.get("profile_photo");

  const heroUrl = heroFile && heroFile.size > 0 ? await uploadImage(heroFile, "home") : current.hero_image_url;
  const profileUrl =
    profileFile && profileFile.size > 0 ? await uploadImage(profileFile, "home") : current.profile_photo_url;

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
