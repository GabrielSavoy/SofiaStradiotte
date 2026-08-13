import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { getContactContent } from "@/lib/content";

export const revalidate = 0;
export const metadata = { title: "Contato — Sofia Stradiotte" };

export default async function ContatoPage() {
  const contact = await getContactContent();

  const links = [
    contact.instagram ? { label: "Instagram", href: contact.instagram } : null,
    contact.pinterest ? { label: "Pinterest", href: contact.pinterest } : null,
    contact.email ? { label: contact.email, href: `mailto:${contact.email}` } : null,
    contact.phone ? { label: contact.phone, href: `tel:${contact.phone}` } : null,
    ...(contact.other_links || []).map((l) => ({ label: l.label, href: l.url })),
  ].filter(Boolean);

  return (
    <div className="site-wrapper">
      <Navbar />

      <section className="contact-section">
        <h1>Contato</h1>
        <p>{contact.page_text}</p>

        {links.length > 0 ? (
          <div className="contact-links">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="contact-link"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}

        <ContactForm />
      </section>

      <Footer contact={contact} />
    </div>
  );
}
