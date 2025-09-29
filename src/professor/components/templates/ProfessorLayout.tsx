import Navbar from "@/components/organisms/Navbar";

interface ProfessorLayoutProps {
  children: React.ReactNode;
}

export default function ProfessorLayout({ children }: ProfessorLayoutProps) {
  const navButtons = [
    {
      label: "Lista de salas",
      hoverProps: "hover:bg-buttons-list-blue",
      to: "/professor",
    },
    {
      label: "Crear sala",
      hoverProps: "hover:bg-unicoop-green",
      to: "/createroom",
    },
  ];

  const user = {
    usuName: "Profesor", // Placeholder, replace with actual user data
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navButtons={navButtons} title={user.usuName} navigateToUpdateInfo="/resetpasswordteacher" />
      {children}
    </div>
  );
};