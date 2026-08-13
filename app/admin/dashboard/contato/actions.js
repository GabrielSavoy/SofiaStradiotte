"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { saveSiteContent } from "@/lib/content";

const LINK_ROWS = 4;

export async function saveContact(prevState, formData) {
  await requireUser();

  const other_links = [];
  for (let i = 0; i < LINK_ROWS; i++) {
    const label = (formData.get(`link_label_${i}`) || "").toString().trim();
    const url = (formData.get(`link_url_${i}`) || "").toString().trim();
    if (label && url) other_links.push({ label, url });
  }

  const data = {
    email: formData.get("email") || "",
    instagram: formData.get("instagram") || "",
    pinterest: formData.get("pinterest") || "",
    phone: formData.get("phone") || "",
    page_text: formData.get("page_text") || "",
    other_links,
  };

  await saveSiteContent("contact", data);
  revalidatePath("/contato");
  revalidatePath("/");
  revalidatePath("/admin/dashboard/contato");

  return { status: "success", message: "Informações de contato atualizadas!" };
}

export async function markMessageRead(formData) {
  await requireUser();
  const supabase = createClient();
  const id = formData.get("id");
  const read = formData.get("read") === "true";

  await supabase.from("contact_messages").update({ read: !read }).eq("id", id);
  revalidatePath("/admin/dashboard/contato");
}

export async function deleteMessage(formData) {
  await requireUser();
  const supabase = createClient();
  const id = formData.get("id");

  await supabase.from("contact_messages").delete().eq("id", id);
  revalidatePath("/admin/dashboard/contato");
}
