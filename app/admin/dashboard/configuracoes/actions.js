"use server";

import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function changePassword(prevState, formData) {
  await requireUser();

  const password = (formData.get("password") || "").toString();
  const confirm = (formData.get("confirm") || "").toString();

  if (password.length < 8) {
    return { status: "error", message: "A senha precisa ter pelo menos 8 caracteres." };
  }

  if (password !== confirm) {
    return { status: "error", message: "As senhas não coincidem." };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { status: "error", message: "Não foi possível trocar a senha. Tente novamente." };
  }

  return { status: "success", message: "Senha atualizada com sucesso!" };
}
