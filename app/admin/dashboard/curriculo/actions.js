"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { getResumeContent, saveSiteContent } from "@/lib/content";
import { uploadDocument } from "@/lib/storage";

const ROWS = 6;

function readItems(formData, prefix) {
  const items = [];
  for (let i = 0; i < ROWS; i++) {
    const title = (formData.get(`${prefix}_title_${i}`) || "").toString().trim();
    const meta = (formData.get(`${prefix}_meta_${i}`) || "").toString().trim();
    const description = (formData.get(`${prefix}_desc_${i}`) || "").toString().trim();
    if (title) items.push({ title, meta, description });
  }
  return items;
}

function readTags(formData, name) {
  return (formData.get(name) || "")
    .toString()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function saveResume(prevState, formData) {
  await requireUser();

  const current = await getResumeContent();
  const pdfFile = formData.get("pdf");
  const pdfUrl = pdfFile && pdfFile.size > 0 ? await uploadDocument(pdfFile, "curriculo") : current.pdf_url;

  const data = {
    formation: readItems(formData, "formation"),
    experience: readItems(formData, "experience"),
    courses: readItems(formData, "courses"),
    skills: readTags(formData, "skills"),
    softwares: readTags(formData, "softwares"),
    languages: readTags(formData, "languages"),
    pdf_url: pdfUrl,
  };

  await saveSiteContent("resume", data);
  revalidatePath("/curriculo");
  revalidatePath("/admin/dashboard/curriculo");

  return { status: "success", message: "Currículo atualizado!" };
}
