import "./globals.css";

export const metadata = {
  title: "SummarizeGPT",
  description: "Summarize any number of previous messages",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-800">{children}</body>
    </html>
  );
}
