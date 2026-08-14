export default function Footer({ contact }) {
  const instagram = contact?.instagram || "#";
  const linkedin = contact?.linkedin || "#";
  const email = contact?.email ? `mailto:${contact.email}` : "#";

  return (
    <footer className="footer">
      <div className="socials">
        <a href={instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
          📷
        </a>
        <a href={linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
          💼
        </a>
        <a href={email} aria-label="E-mail">
          ✉️
        </a>
      </div>
      <div className="footer-center">
        <p>🩷 Feito com amor 🩷</p>
        <p>© {new Date().getFullYear()} Sofia Stradiotte. Todos os direitos reservados.</p>
      </div>
      <div className="footer-deco">🎀</div>
    </footer>
  );
}
