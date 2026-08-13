"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/app/admin/actions";

const initialState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={pending}>
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction}>
      {state.status === "error" ? <div className="alert error">{state.message}</div> : null}

      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required autoFocus />
      </div>
      <div className="field">
        <label htmlFor="password">Senha</label>
        <input id="password" name="password" type="password" required />
      </div>
      <SubmitButton />
    </form>
  );
}
