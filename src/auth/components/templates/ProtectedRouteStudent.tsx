import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useStudentStore } from "@/stores/StudentStore";

const ProtectedRouteStudent = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { student, loading, studentProfile } = useStudentStore();

  useEffect(() => {
    if (loading) {
      studentProfile();
    }
  }, [loading, studentProfile]);
  

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!student) {
    return <Navigate to="/middlewarestudent" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(student.usuRole)) {
    const rolePath = `/${student.usuRole}`;
    return <Navigate to={rolePath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteStudent;
