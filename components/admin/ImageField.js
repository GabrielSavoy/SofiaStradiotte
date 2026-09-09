"use client";

import { useState } from "react";

export default function ImageField({ name, label, currentUrl, hint, accept = "image/*" }) {
  const [preview, setPreview] = useState(currentUrl || "");
  const [removed, setRemoved] = useState(false);

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setRemoved(false);
    }
  }

  function handleRemove() {
    setPreview("");
    setRemoved(true);
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
      {currentUrl && !removed ? (
        <button
          type="button"
          onClick={handleRemove}
          style={{
            display: "block",
            marginTop: 8,
            background: "none",
            border: "none",
            padding: 0,
            color: "var(--danger, #c0392b)",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          Remover foto atual
        </button>
      ) : null}
      {removed ? <input type="hidden" name={`${name}_remove`} value="1" /> : null}
      {hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  );
}
