"use client";

import { useFormState, useFormStatus } from "react-dom";
import { sendContactMessage } from "@/app/contato/actions";

const initialState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? "Enviando..." : "Enviar mensagem"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(sendContactMessage, initialState);

  return (
    <form className="contact-form" action={formAction}>
      {state.status === "success" ? <div className="form-success">{state.message}</div> : null}
      {state.status === "error" ? <div className="form-error">{state.message}</div> : null}

      <div>
        <label htmlFor="name">Nome</label>
        <input id="name" name="name" type="text" required />
      </div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="message">Mensagem</label>
        <textarea id="message" name="message" required></textarea>
      </div>
      <SubmitButton />
    </form>
  );
}
