import NovoProjetoForm from "@/components/admin/NovoProjetoForm";

export default function NovoProjetoPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Novo projeto</h1>
          <p>Depois de criar, você poderá adicionar mais imagens ao projeto.</p>
        </div>
      </div>
      <NovoProjetoForm />
    </div>
  );
}
