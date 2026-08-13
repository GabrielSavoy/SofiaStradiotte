"use client";

import { createBrowserClient } from "@supabase/ssr";

// Cliente Supabase para uso em Client Components (formulário de login, etc.).
// Usa apenas a chave "anon", que é pública por design — a segurança real
// vem das políticas de RLS configuradas no banco (ver supabase/schema.sql).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
