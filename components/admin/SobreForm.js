"use client";

import { useFormState } from "react-dom";
import ImageField from "@/components/admin/ImageField";
import SaveButton from "@/components/admin/SaveButton";
import { saveAbout } from "@/app/admin/dashboard/sobre/actions";

const initialState = { status: "idle", message: "" };

export default function SobreForm({ about }) {
  const [state, formAction] = useFormState(saveAbout, initialState);

  return (
    <form action={formAction}>
      {state.status === "success" ? <div className="alert success">{state.message}</div> : null}
      {state.status === "error" ? <div className="alert error">{state.message}</div> : null}

      <div className="admin-card">
        <h2>Conteúdo</h2>
        <div className="field">
          <label htmlFor="heading">Título</label>
          <input id="heading" name="heading" type="text" defaultValue={about.heading} />
        </div>
        <div className="field">
          <label htmlFor="bio">Apresentação / Biografia</label>
          <textarea id="bio" name="bio" defaultValue={about.bio} style={{ minHeight: 140 }}></textarea>
        </div>
        <div className="field">
          <label htmlFor="formation">Formação</label>
          <textarea id="formation" name="formation" defaultValue={about.formation}></textarea>
        </div>
        <div className="field">
          <label htmlFor="interests">Interesses</label>
          <textarea id="interests" name="interests" defaultValue={about.interests}></textarea>
        </div>
        <div className="field">
          <label htmlFor="skills">Habilidades</label>
          <input id="skills" name="skills" type="text" defaultValue={(about.skills || []).join(", ")} />
          <p className="field-hint">Separe cada habilidade por vírgula. Ex: Costura, Modelagem, Ilustração</p>
        </div>
      </div>

      <div className="admin-card">
        <h2>Imagem</h2>
        <ImageField name="image" label="Foto ou ilustração" currentUrl={about.image_url} />
      </div>

      <div className="form-actions">
        <SaveButton />
      </div>
    </form>
  );
}
