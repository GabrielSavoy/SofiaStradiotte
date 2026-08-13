"use client";

// Lista de até 6 itens (formação, experiência, cursos). Linhas com título
// vazio são ignoradas ao salvar — assim a Sofia só preenche quantas
// precisar, sem precisar de JS extra para adicionar/remover linhas.
const ROWS = 6;

export default function RepeatableRows({ prefix, label, items = [] }) {
  const rows = Array.from({ length: ROWS }, (_, i) => items[i] || { title: "", meta: "", description: "" });

  return (
    <div className="admin-card">
      <h2>{label}</h2>
      <p className="field-hint" style={{ marginBottom: 14 }}>
        Preencha os campos que quiser usar. Deixe o título em branco para não exibir.
      </p>
      <div className="repeatable-list">
        {rows.map((row, i) => (
          <div className="repeatable-item" key={i}>
            <div className="field">
              <label htmlFor={`${prefix}_title_${i}`}>Título</label>
              <input id={`${prefix}_title_${i}`} name={`${prefix}_title_${i}`} type="text" defaultValue={row.title} />
            </div>
            <div className="field">
              <label htmlFor={`${prefix}_meta_${i}`}>Período / instituição</label>
              <input id={`${prefix}_meta_${i}`} name={`${prefix}_meta_${i}`} type="text" defaultValue={row.meta} />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label htmlFor={`${prefix}_desc_${i}`}>Descrição</label>
              <textarea id={`${prefix}_desc_${i}`} name={`${prefix}_desc_${i}`} defaultValue={row.description}></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
