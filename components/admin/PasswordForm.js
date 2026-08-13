"use client";

import { useFormState } from "react-dom";
import SaveButton from "@/components/admin/SaveButton";
import { changePassword } from "@/app/admin/dashboard/configuracoes/actions";

const initialState = { status: "idle", message: "" };

export default function PasswordForm() {
  const [state, formAction] = useFormState(changePassword, initialState);

  return (
    <form action={formAction}>
      {state.status === "success" ? <div className="alert success">{state.message}</div> : null}
      {state.status === "error" ? <div className="alert error">{state.message}</div> : null}

      <div className="field">
        <label htmlFor="password">Nova senha</label>
        <input id="password" name="password" type="password" minLength={8} required />
      </div>
      <div className="field">
        <label htmlFor="confirm">Confirmar nova senha</label>
        <input id="confirm" name="confirm" type="password" minLength={8} required />
      </div>
      <SaveButton label="Trocar senha" />
    </form>
  );
}
