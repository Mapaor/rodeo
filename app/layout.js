import "@/styles/globals.css";

export const metadata = {
  title: "Rodeo Studio",
  description: "La teva productora audiovisual de confiança",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}