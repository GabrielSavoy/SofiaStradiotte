"use server";

import { createClient } from "@/lib/supabase/server";

// Server Action pública (sem autenticação) que grava a mensagem no banco.
// A tabela contact_messages tem uma política de RLS que permite INSERT
// para qualquer visitante, mas só o admin autenticado consegue ler/editar
// as mensagens depois (ver supabase/schema.sql).
export async function sendContactMessage(prevState, formData) {
  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Preencha todos os campos." };
  }

  const supabase = createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    message,
  });

  if (error) {
    return { status: "error", message: "Não foi possível enviar. Tente novamente." };
  }

  return { status: "success", message: "Mensagem enviada! Obrigada pelo contato 🩷" };
}
