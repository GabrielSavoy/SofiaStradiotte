import { createClient } from "@/lib/supabase/server";
import PasswordForm from "@/components/admin/PasswordForm";

export const revalidate = 0;

export default async function ConfiguracoesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Configurações</h1>
          <p>Dados da sua conta de administradora.</p>
        </div>
      </div>

      <div className="admin-card">
        <h2>Conta</h2>
        <p className="field-hint">Logada como: <strong>{user?.email}</strong></p>
      </div>

      <div className="admin-card">
        <h2>Trocar senha</h2>
        <PasswordForm />
      </div>
    </div>
  );
}
