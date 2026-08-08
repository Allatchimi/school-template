export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {children}
    </div>
  );
}
