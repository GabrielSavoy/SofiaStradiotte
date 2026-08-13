"use client";

import { useFormStatus } from "react-dom";

export default function SaveButton({ label = "Salvar alterações" }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? "Salvando..." : label}
    </button>
  );
}
