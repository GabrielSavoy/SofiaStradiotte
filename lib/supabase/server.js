import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Cliente Supabase para uso em Server Components, Server Actions e no
// middleware. Lê/escreve a sessão do usuário via cookies HTTP-only, então
// nenhum token fica acessível para JavaScript no navegador.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // chamado a partir de um Server Component — o middleware cuida
            // de renovar a sessão nesse caso, então é seguro ignorar.
          }
        },
      },
    }
  );
}
