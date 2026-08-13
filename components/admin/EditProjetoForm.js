"use client";

import { useFormState } from "react-dom";
import ImageField from "@/components/admin/ImageField";
import SaveButton from "@/components/admin/SaveButton";
import { updateProject, deleteProject } from "@/app/admin/dashboard/portfolio/actions";

const initialState = { status: "idle", message: "" };

export default function EditProjetoForm({ project }) {
  const [state, formAction] = useFormState(updateProject, initialState);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="id" value={project.id} />
        {state.status === "success" ? <div className="alert success">{state.message}</div> : null}
        {state.status === "error" ? <div className="alert error">{state.message}</div> : null}

        <div className="admin-card">
          <div className="field">
            <label htmlFor="title">Título</label>
            <input id="title" name="title" type="text" defaultValue={project.title} required />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="category">Categoria</label>
              <input id="category" name="category" type="text" defaultValue={project.category || ""} />
            </div>
            <div className="field">
              <label htmlFor="project_date">Data</label>
              <input id="project_date" name="project_date" type="date" defaultValue={project.project_date || ""} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="description">Descrição</label>
            <textarea id="description" name="description" defaultValue={project.description || ""}></textarea>
          </div>
          <ImageField name="cover_image" label="Imagem de capa" currentUrl={project.cover_image_url} />
          <div className="field" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              id="published"
              name="published"
              type="checkbox"
              style={{ width: "auto" }}
              defaultChecked={project.published}
            />
            <label htmlFor="published" style={{ marginBottom: 0 }}>Publicado no site</label>
          </div>
        </div>

        <div className="form-actions">
          <SaveButton />
        </div>
      </form>

      <form action={deleteProject} style={{ marginTop: 10 }}>
        <input type="hidden" name="id" value={project.id} />
        <button type="submit" className="btn-danger btn-sm">
          Excluir projeto
        </button>
      </form>
    </>
  );
}
