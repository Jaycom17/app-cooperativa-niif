import AsideStudent from "./components/AsideStudent";

function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <AsideStudent />
      {children}
    </main>
  );
}

export default StudentLayout;
