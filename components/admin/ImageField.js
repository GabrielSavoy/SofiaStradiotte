"use client";

import { useState } from "react";

// Campo de upload reutilizável. Mostra a imagem atual (se houver) e deixa
// escolher um arquivo novo. O upload de verdade acontece no servidor,
// dentro da Server Action que recebe o <form>, então nenhuma chave do
// Supabase precisa ficar exposta no navegador.
export default function ImageField({ name, label, currentUrl, hint, accept = "image/*" }) {
  const [preview, setPreview] = useState(currentUrl || "");

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt={label}
          style={{
            width: 120,
            height: 120,
            objectFit: "cover",
            borderRadius: 12,
            border: "1px solid var(--border)",
            marginBottom: 10,
          }}
        />
      ) : null}
      <input id={name} name={name} type="file" accept={accept} onChange={handleChange} />
      {hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  );
}
