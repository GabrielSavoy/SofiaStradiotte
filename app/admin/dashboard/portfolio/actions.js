"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getPortfolioProjects } from "@/lib/content";
import { uploadImage, deleteFileByUrl } from "@/lib/storage";

export async function createProject(prevState, formData) {
  await requireUser();
  const supabase = createClient();

  const coverFile = formData.get("cover_image");
  const coverUrl = coverFile && coverFile.size > 0 ? await uploadImage(coverFile, "portfolio") : null;

  const existing = await getPortfolioProjects({ onlyPublished: false });

  const { data, error } = await supabase
    .from("portfolio_projects")
    .insert({
      title: formData.get("title") || "Novo projeto",
      description: formData.get("description") || "",
      category: formData.get("category") || "",
      project_date: formData.get("project_date") || null,
      cover_image_url: coverUrl,
      published: formData.get("published") === "on",
      order_index: existing.length,
    })
    .select()
    .single();

  if (error) {
    return { status: "error", message: "Não foi possível criar o projeto." };
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin/dashboard/portfolio");
  redirect(`/admin/dashboard/portfolio/${data.id}`);
}

export async function updateProject(prevState, formData) {
  await requireUser();
  const supabase = createClient();
  const id = formData.get("id");

  const coverFile = formData.get("cover_image");
  const updates = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    project_date: formData.get("project_date") || null,
    published: formData.get("published") === "on",
  };

  if (coverFile && coverFile.size > 0) {
    updates.cover_image_url = await uploadImage(coverFile, "portfolio");
  }

  const { error } = await supabase.from("portfolio_projects").update(updates).eq("id", id);

  if (error) {
    return { status: "error", message: "Não foi possível salvar." };
  }

  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${id}`);
  revalidatePath(`/admin/dashboard/portfolio/${id}`);

  return { status: "success", message: "Projeto atualizado!" };
}

export async function deleteProject(formData) {
  await requireUser();
  const supabase = createClient();
  const id = formData.get("id");

  await supabase.from("portfolio_projects").delete().eq("id", id);

  revalidatePath("/portfolio");
  revalidatePath("/admin/dashboard/portfolio");
  redirect("/admin/dashboard/portfolio");
}

export async function togglePublish(formData) {
  await requireUser();
  const supabase = createClient();
  const id = formData.get("id");
  const published = formData.get("published") === "true";

  await supabase.from("portfolio_projects").update({ published: !published }).eq("id", id);

  revalidatePath("/portfolio");
  revalidatePath("/admin/dashboard/portfolio");
}

export async function moveProject(formData) {
  await requireUser();
  const supabase = createClient();
  const id = formData.get("id");
  const direction = formData.get("direction");

  const projects = await getPortfolioProjects({ onlyPublished: false });
  const index = projects.findIndex((p) => p.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;

  if (index === -1 || swapWith < 0 || swapWith >= projects.length) return;

  const a = projects[index];
  const b = projects[swapWith];

  await supabase.from("portfolio_projects").update({ order_index: b.order_index }).eq("id", a.id);
  await supabase.from("portfolio_projects").update({ order_index: a.order_index }).eq("id", b.id);

  revalidatePath("/portfolio");
  revalidatePath("/admin/dashboard/portfolio");
}

export async function addProjectImages(formData) {
  await requireUser();
  const supabase = createClient();
  const projectId = formData.get("project_id");
  const files = formData.getAll("images").filter((f) => f && f.size > 0);

  const { data: existingImages } = await supabase
    .from("portfolio_images")
    .select("order_index")
    .eq("project_id", projectId)
    .order("order_index", { ascending: false })
    .limit(1);

  let nextOrder = (existingImages?.[0]?.order_index ?? -1) + 1;

  for (const file of files) {
    const url = await uploadImage(file, `portfolio/${projectId}`);
    await supabase.from("portfolio_images").insert({
      project_id: projectId,
      image_url: url,
      order_index: nextOrder++,
    });
  }

  revalidatePath(`/portfolio/${projectId}`);
  revalidatePath(`/admin/dashboard/portfolio/${projectId}`);
}

export async function deleteProjectImage(formData) {
  await requireUser();
  const supabase = createClient();
  const imageId = formData.get("image_id");
  const projectId = formData.get("project_id");
  const imageUrl = formData.get("image_url");

  await supabase.from("portfolio_images").delete().eq("id", imageId);
  if (imageUrl) await deleteFileByUrl(imageUrl.toString());

  revalidatePath(`/portfolio/${projectId}`);
  revalidatePath(`/admin/dashboard/portfolio/${projectId}`);
}
