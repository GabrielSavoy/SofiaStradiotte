"use client";

import { markMessageRead, deleteMessage } from "@/app/admin/dashboard/contato/actions";

export default function MessagesList({ messages }) {
  if (messages.length === 0) {
    return <p className="empty-admin">Nenhuma mensagem recebida ainda.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th></th>
            <th>De</th>
            <th>Mensagem</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td>
                {!msg.read ? <span className="badge unread">Nova</span> : null}
              </td>
              <td>
                <strong>{msg.name}</strong>
                <br />
                <span className="field-hint">{msg.email}</span>
              </td>
              <td style={{ maxWidth: 320 }}>{msg.message}</td>
              <td>{new Date(msg.created_at).toLocaleDateString("pt-BR")}</td>
              <td>
                <div className="row-actions">
                  <form action={markMessageRead}>
                    <input type="hidden" name="id" value={msg.id} />
                    <input type="hidden" name="read" value={String(msg.read)} />
                    <button type="submit" className="btn-secondary btn-sm">
                      {msg.read ? "Marcar não lida" : "Marcar lida"}
                    </button>
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={msg.id} />
                    <button type="submit" className="btn-danger btn-sm">Excluir</button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
