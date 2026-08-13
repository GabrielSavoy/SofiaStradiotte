"use client";

export default function DocumentField({ name, label, currentUrl, hint, accept = "application/pdf" }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {currentUrl ? (
        <p className="field-hint" style={{ marginBottom: 8 }}>
          Arquivo atual:{" "}
          <a href={currentUrl} target="_blank" rel="noreferrer" style={{ color: "var(--accent-dark)", fontWeight: 600 }}>
            ver PDF ↗
          </a>
        </p>
      ) : null}
      <input id={name} name={name} type="file" accept={accept} />
      {hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  );
}
