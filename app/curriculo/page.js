import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getResumeContent, getContactContent } from "@/lib/content";

export const revalidate = 0;
export const metadata = { title: "Currículo — Sofia Stradiotte" };

function Block({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="resume-block">
      <h2>{title}</h2>
      {items.map((item, i) => (
        <div className="resume-item" key={i}>
          <p className="r-title">{item.title}</p>
          {item.meta ? <p className="r-meta">{item.meta}</p> : null}
          {item.description ? <p className="r-desc">{item.description}</p> : null}
        </div>
      ))}
    </div>
  );
}

function TagBlock({ title, tags }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="resume-block">
      <h2>{title}</h2>
      <div className="resume-tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default async function CurriculoPage() {
  const [resume, contact] = await Promise.all([getResumeContent(), getContactContent()]);

  const isEmpty =
    !resume.formation?.length &&
    !resume.experience?.length &&
    !resume.courses?.length &&
    !resume.skills?.length &&
    !resume.softwares?.length &&
    !resume.languages?.length;

  return (
    <div className="site-wrapper">
      <Navbar />

      <section className="resume-section">
        <h1>Currículo</h1>

        {isEmpty ? (
          <p className="empty-state">Página em construção.</p>
        ) : (
          <>
            <Block title="Formação" items={resume.formation} />
            <Block title="Experiência" items={resume.experience} />
            <Block title="Cursos" items={resume.courses} />
            <TagBlock title="Habilidades" tags={resume.skills} />
            <TagBlock title="Softwares" tags={resume.softwares} />
            <TagBlock title="Idiomas" tags={resume.languages} />
          </>
        )}

        {resume.pdf_url ? (
          <div className="resume-download">
            <a href={resume.pdf_url} className="btn-primary" target="_blank" rel="noreferrer">
              Baixar currículo em PDF
            </a>
          </div>
        ) : null}
      </section>

      <Footer contact={contact} />
    </div>
  );
}
