import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Entrar — Painel Sofia Stradiotte" };

export default function AdminLoginPage() {
  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <p className="logo" style={{ display: "flex" }}>🎀 Sofia Stradiotte 🎀</p>
        <h1>Área administrativa</h1>
        <p className="sub">Entre com seu e-mail e senha para editar o site.</p>
        <LoginForm />
      </div>
    </div>
  );
}
