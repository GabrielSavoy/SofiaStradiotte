"use client";

import { useFormState } from "react-dom";
import ImageField from "@/components/admin/ImageField";
import SaveButton from "@/components/admin/SaveButton";
import { saveHome } from "@/app/admin/dashboard/inicio/actions";

const initialState = { status: "idle", message: "" };

export default function InicioForm({ home }) {
  const [state, formAction] = useFormState(saveHome, initialState);

  return (
    <form action={formAction}>
      {state.status === "success" ? <div className="alert success">{state.message}</div> : null}
      {state.status === "error" ? <div className="alert error">{state.message}</div> : null}

      <div className="admin-card">
        <h2>Apresentação</h2>
        <div className="field">
          <label htmlFor="eyebrow">Texto acima do nome</label>
          <input id="eyebrow" name="eyebrow" type="text" defaultValue={home.eyebrow} />
        </div>
        <div className="field">
          <label htmlFor="name">Nome</label>
          <input id="name" name="name" type="text" defaultValue={home.name} />
        </div>
        <div className="field">
          <label htmlFor="description">Descrição</label>
          <textarea id="description" name="description" defaultValue={home.description}></textarea>
        </div>
        <div className="field">
          <label htmlFor="cta_label">Texto do botão</label>
          <input id="cta_label" name="cta_label" type="text" defaultValue={home.cta_label} />
        </div>
      </div>

      <div className="admin-card">
        <h2>Imagens</h2>
        <ImageField
          name="hero_image"
          label="Imagem de fundo do topo"
          currentUrl={home.hero_image_url}
          hint="Imagem grande usada como fundo da primeira tela do site."
        />
        <ImageField
          name="profile_photo"
          label="Foto no quadro (polaroid)"
          currentUrl={home.profile_photo_url}
          hint="Aparece dentro do quadrinho branco, ao lado do seu nome."
        />
      </div>

      <div className="admin-card">
        <h2>Cards de navegação</h2>
        <p className="field-hint" style={{ marginBottom: 14 }}>
          Os 5 blocos que aparecem logo abaixo da imagem principal.
        </p>
        <div className="repeatable-list">
          {home.cards.map((card, i) => (
            <div className="repeatable-item" key={i}>
              <div className="field">
                <label htmlFor={`card_title_${i}`}>Título</label>
                <input id={`card_title_${i}`} name={`card_title_${i}`} type="text" defaultValue={card.title} />
              </div>
              <div className="field">
                <label htmlFor={`card_description_${i}`}>Descrição</label>
                <input
                  id={`card_description_${i}`}
                  name={`card_description_${i}`}
                  type="text"
                  defaultValue={card.description}
                />
              </div>
              <div className="field">
                <label htmlFor={`card_href_${i}`}>Link</label>
                <input id={`card_href_${i}`} name={`card_href_${i}`} type="text" defaultValue={card.href} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <SaveButton />
      </div>
    </form>
  );
}
