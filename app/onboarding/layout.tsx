export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-prose mx-auto h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
