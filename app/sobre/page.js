import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAboutContent, getContactContent } from "@/lib/content";

export const revalidate = 0;
export const metadata = { title: "Sobre Mim — Sofia Stradiotte" };

export default async function SobrePage() {
  const [about, contact] = await Promise.all([getAboutContent(), getContactContent()]);

  return (
    <div className="site-wrapper">
      <Navbar />

      <section className="about-section">
        {about.image_url ? (
          <div className="placeholder-mannequin" style={{ backgroundImage: `url('${about.image_url}')` }} />
        ) : null}
        <h1>{about.heading || "Sobre Mim"}</h1>
        {about.bio ? <p className="bio">{about.bio}</p> : <p className="bio">Página em construção.</p>}
        {about.formation ? <p className="formation">{about.formation}</p> : null}
        {about.interests ? <p className="interests">{about.interests}</p> : null}
        {about.skills?.length ? (
          <div className="about-skills">
            {about.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        ) : null}
      </section>

      <Footer contact={contact} />
    </div>
  );
}
