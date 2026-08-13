import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Usado no topo de páginas/actions do dashboard. Garante que só um usuário
// realmente autenticado no Supabase (não um cookie fake) chegue até a
// operação de edição/exclusão. O middleware já bloqueia a navegação, isso
// aqui é uma segunda camada de defesa dentro das próprias Server Actions.
export async function requireUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin");
  }

  return user;
}
