"use client";

import { useFormState } from "react-dom";
import SaveButton from "@/components/admin/SaveButton";
import { saveContact } from "@/app/admin/dashboard/contato/actions";

const initialState = { status: "idle", message: "" };
const LINK_ROWS = 4;

export default function ContatoForm({ contact }) {
  const [state, formAction] = useFormState(saveContact, initialState);
  const links = contact.other_links || [];

  return (
    <form action={formAction}>
      {state.status === "success" ? <div className="alert success">{state.message}</div> : null}
      {state.status === "error" ? <div className="alert error">{state.message}</div> : null}

      <div className="admin-card">
        <h2>Contato e redes sociais</h2>
        <div className="field-row">
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" defaultValue={contact.email} />
          </div>
          <div className="field">
            <label htmlFor="phone">Telefone / WhatsApp</label>
            <input id="phone" name="phone" type="text" defaultValue={contact.phone} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="instagram">Instagram (link completo)</label>
            <input id="instagram" name="instagram" type="text" defaultValue={contact.instagram} placeholder="https://instagram.com/..." />
          </div>
          <div className="field">
            <label htmlFor="linkedin">LinkedIn (link completo)</label>
            <input id="linkedin" name="linkedin" type="text" defaultValue={contact.linkedin} placeholder="https://linkedin.com/..." />
          </div>
        </div>
        <div className="field">
          <label htmlFor="page_text">Texto da página de contato</label>
          <textarea id="page_text" name="page_text" defaultValue={contact.page_text}></textarea>
        </div>
      </div>

      <div className="admin-card">
        <h2>Outros links</h2>
        <div className="repeatable-list">
          {Array.from({ length: LINK_ROWS }, (_, i) => links[i] || { label: "", url: "" }).map((link, i) => (
            <div className="repeatable-item" key={i}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor={`link_label_${i}`}>Nome</label>
                  <input id={`link_label_${i}`} name={`link_label_${i}`} type="text" defaultValue={link.label} />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label htmlFor={`link_url_${i}`}>Link</label>
                  <input id={`link_url_${i}`} name={`link_url_${i}`} type="text" defaultValue={link.url} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <SaveButton />
      </div>
    </form>
  );
}
