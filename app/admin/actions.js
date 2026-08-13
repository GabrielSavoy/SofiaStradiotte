"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Login de verdade contra o Supabase Auth — não é uma tela decorativa.
// Só existe um usuário administrador (a Sofia), criado manualmente no
// painel do Supabase ou via SQL (ver SETUP.md). Não há cadastro público.
export async function login(prevState, formData) {
  const email = (formData.get("email") || "").toString().trim();
  const password = (formData.get("password") || "").toString();

  if (!email || !password) {
    return { status: "error", message: "Informe e-mail e senha." };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { status: "error", message: "E-mail ou senha inválidos." };
  }

  revalidatePath("/admin", "layout");
  redirect("/admin/dashboard");
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/admin", "layout");
  redirect("/admin");
}
