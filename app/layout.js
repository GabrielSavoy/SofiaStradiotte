import "@/styles/globals.css";

export const metadata = {
  title: "Sofia Stradiotte — Portfólio",
  description: "Portfólio de Sofia Stradiotte, estudante de Moda na FAAP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
