import Navbar from "../organisms/Navbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps){
  const navButtons = [
    {
      label: "Lista de profesores",
      hoverProps: "hover:bg-buttons-list-blue",
      to: "/admin",
    },
    {
      label: "Crear profesor",
      hoverProps: "hover:bg-unicoop-green",
      to: "/createprofessor",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navButtons={navButtons} title="Administrador" navigateToUpdateInfo="/updateinfoadmin" />
      {children}
    </div>
  );
};
