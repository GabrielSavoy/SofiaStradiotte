import { getContactContent, getContactMessages } from "@/lib/content";
import ContatoForm from "@/components/admin/ContatoForm";
import MessagesList from "@/components/admin/MessagesList";

export const revalidate = 0;

export default async function AdminContatoPage() {
  const [contact, messages] = await Promise.all([getContactContent(), getContactMessages()]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Contato</h1>
          <p>Edite os dados de contato e veja as mensagens recebidas pelo formulário.</p>
        </div>
      </div>

      <ContatoForm contact={contact} />

      <div className="admin-card">
        <h2>Mensagens recebidas ({messages.length})</h2>
        <MessagesList messages={messages} />
      </div>
    </div>
  );
}
