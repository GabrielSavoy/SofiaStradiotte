import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getHomeContent, getContactContent } from "@/lib/content";

export const revalidate = 0;

const CARD_ICONS = {
  "/sobre": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  ),
  "/portfolio": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  ),
  "/fotos": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7l2-3h4l2 3" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  ),
  "/curriculo": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2h8l4 4v16H6z" />
      <path d="M14 2v4h4" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  ),
  "/contato": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
};

export default async function HomePage() {
  const [home, contact] = await Promise.all([getHomeContent(), getContactContent()]);

  return (
    <div className="site-wrapper">
      <Navbar />

      <section
        className="hero"
        style={
          home.hero_image_url
            ? { backgroundImage: `url('${home.hero_image_url}')` }
            : undefined
        }
      >
        <div className="deco-stitch deco-needle">
          <svg viewBox="0 0 40 100" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <line x1="20" y1="10" x2="20" y2="88" />
            <ellipse cx="20" cy="8" rx="3" ry="5" />
            <path d="M20 88 L16 96 M20 88 L24 96" />
            <path d="M20 8 C10 16, 4 28, 11 36 C18 44, 8 52, 14 60" strokeWidth="0.8" />
          </svg>
        </div>

        <div className="deco-stitch deco-pin">
          <svg viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <line x1="10" y1="10" x2="54" y2="10" />
            <circle cx="8" cy="10" r="4" fill="currentColor" stroke="none" />
          </svg>
        </div>

        <div className="hero-text">
          <p className="eyebrow">
            {home.eyebrow}
            <svg className="icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 20s-7-4.5-9.5-9C1 7 3 3.5 6.5 3.5c2 0 3.5 1.3 4.5 3 1-1.7 2.5-3 4.5-3C19 3.5 21 7 19.5 11c-2.5 4.5-9.5 9-9.5 9z" />
            </svg>
          </p>
          <h1 className="script-title">
            {home.name}
            <svg className="title-underline" viewBox="0 0 320 20" preserveAspectRatio="none">
              <path d="M4 10 Q 80 2, 160 10 T 316 10" stroke="var(--accent-light)" strokeWidth="6" fill="none" strokeLinecap="round" />
            </svg>
          </h1>
          <p className="desc">
            {home.description}
            <svg className="icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 20s-7-4.5-9.5-9C1 7 3 3.5 6.5 3.5c2 0 3.5 1.3 4.5 3 1-1.7 2.5-3 4.5-3C19 3.5 21 7 19.5 11c-2.5 4.5-9.5 9-9.5 9z" />
            </svg>
          </p>
          <Link href="/sobre" className="btn-primary">
            {home.cta_label}
          </Link>
        </div>

        <div className="hero-image">
          <div className="polaroid">
            <div className="tape"></div>
            <div className="photo-placeholder">
              {home.profile_photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={home.profile_photo_url} alt={home.name} />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7l2-3h4l2 3" />
                  <circle cx="12" cy="13.5" r="3.5" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="cards-grid">
        {(home.cards || []).map((card, i) => (
          <div className="card" key={card.href || i}>
            <span className={`card-accent ${i === 2 ? "bottom-left" : "top-right"}`}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c.6 4.8 2.6 8 7 9-4.4 1-6.4 4.2-7 9-.6-4.8-2.6-8-7-9 4.4-1 6.4-4.2 7-9z" />
              </svg>
            </span>
            <div className="card-icon">{CARD_ICONS[card.href] || null}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <Link href={card.href} className="acessar">
              Acessar →
            </Link>
          </div>
        ))}
      </section>

      <Footer contact={contact} />
    </div>
  );
}
