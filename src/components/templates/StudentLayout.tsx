import AsideStudent from "@/components/organisms/AsideStudent";

function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <AsideStudent />
      {children}
    </main>
  );
}

export default StudentLayout;
