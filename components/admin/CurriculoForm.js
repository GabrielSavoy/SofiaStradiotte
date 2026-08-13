"use client";

import { useFormState } from "react-dom";
import RepeatableRows from "@/components/admin/RepeatableRows";
import DocumentField from "@/components/admin/DocumentField";
import SaveButton from "@/components/admin/SaveButton";
import { saveResume } from "@/app/admin/dashboard/curriculo/actions";

const initialState = { status: "idle", message: "" };

export default function CurriculoForm({ resume }) {
  const [state, formAction] = useFormState(saveResume, initialState);

  return (
    <form action={formAction}>
      {state.status === "success" ? <div className="alert success">{state.message}</div> : null}
      {state.status === "error" ? <div className="alert error">{state.message}</div> : null}

      <RepeatableRows prefix="formation" label="Formação" items={resume.formation} />
      <RepeatableRows prefix="experience" label="Experiência" items={resume.experience} />
      <RepeatableRows prefix="courses" label="Cursos" items={resume.courses} />

      <div className="admin-card">
        <h2>Habilidades, softwares e idiomas</h2>
        <div className="field">
          <label htmlFor="skills">Habilidades</label>
          <input id="skills" name="skills" type="text" defaultValue={(resume.skills || []).join(", ")} />
        </div>
        <div className="field">
          <label htmlFor="softwares">Softwares</label>
          <input id="softwares" name="softwares" type="text" defaultValue={(resume.softwares || []).join(", ")} />
        </div>
        <div className="field">
          <label htmlFor="languages">Idiomas</label>
          <input id="languages" name="languages" type="text" defaultValue={(resume.languages || []).join(", ")} />
        </div>
        <p className="field-hint">Separe cada item por vírgula.</p>
      </div>

      <div className="admin-card">
        <h2>Currículo em PDF</h2>
        <DocumentField name="pdf" label="Arquivo PDF" currentUrl={resume.pdf_url} hint="Opcional — disponibiliza um botão de download na página pública." />
      </div>

      <div className="form-actions">
        <SaveButton />
      </div>
    </form>
  );
}
