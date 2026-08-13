"use client";

import { useFormState } from "react-dom";
import ImageField from "@/components/admin/ImageField";
import SaveButton from "@/components/admin/SaveButton";
import { createProject } from "@/app/admin/dashboard/portfolio/actions";

const initialState = { status: "idle", message: "" };

export default function NovoProjetoForm() {
  const [state, formAction] = useFormState(createProject, initialState);

  return (
    <form action={formAction}>
      {state?.status === "error" ? <div className="alert error">{state.message}</div> : null}

      <div className="admin-card">
        <div className="field">
          <label htmlFor="title">Título</label>
          <input id="title" name="title" type="text" required />
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="category">Categoria</label>
            <input id="category" name="category" type="text" placeholder="Ex: Coleção, Croqui, Ilustração" />
          </div>
          <div className="field">
            <label htmlFor="project_date">Data</label>
            <input id="project_date" name="project_date" type="date" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="description">Descrição</label>
          <textarea id="description" name="description"></textarea>
        </div>
        <ImageField name="cover_image" label="Imagem de capa" />
        <div className="field" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input id="published" name="published" type="checkbox" style={{ width: "auto" }} defaultChecked />
          <label htmlFor="published" style={{ marginBottom: 0 }}>Publicar imediatamente</label>
        </div>
      </div>

      <div className="form-actions">
        <SaveButton label="Criar projeto" />
      </div>
    </form>
  );
}
