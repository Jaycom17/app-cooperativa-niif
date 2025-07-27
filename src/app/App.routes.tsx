import { useRoutes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import MainPage from "../auth/pages/MainPage";
import MainStudent from "../student/pages/MainStudent";
import MiddlewareStudent from "../student/pages/MiddlewareStudent";
import MainAdminPage from "../admin/pages/MainAdminPage";
import MainProfessorPage from "../professor/pages/MainProfessorPage";
import CreateProfessorPage from "../admin/pages/CreateProfessorPage";
import CreateRoomPage from "../professor/pages/CreateRoomPage";
import ResetPasswordPage from "../professor/pages/ResetPasswordPage";
import UpdateInfoAdminPage from "../admin/pages/UpdateInfoAdminPage";
import Form110 from "../forms/pages/Form110";
import ActivosFijosForm from "../forms/pages/ActivosFijosForm";
import ESFpatrimonioForm from "../forms/pages/ESFPatrimonioForm";
import ProtectedRoute from "../auth/components/templates/ProtectedRoute";
import ProtectedRouteStudent from "../auth/components/templates/ProtectedRouteStudent";

export const AppRoutes = () => {
  const routes = [
    {
      element: <LoginPage />,
      path: "/login",
    },
    {
      element: <MainPage />,
      path: "/",
    },
    {
      element: <MiddlewareStudent />,
      path: "/middlewarestudent",
    },
    {
      element: <ProtectedRoute allowedRoles={["admin"]} />,
      children: [
        {
          element: <MainAdminPage />,
          path: "/admin",
        },
        {
          element: <CreateProfessorPage />,
          path: "/createprofessor",
        },
        {
          element: <UpdateInfoAdminPage />,
          path: "/updateinfoadmin",
        },
      ],
    },
    {
      element: <ProtectedRoute allowedRoles={["professor"]} />,
      children: [
        {
          element: <MainProfessorPage />,
          path: "/professor",
        },
        {
          element: <CreateRoomPage />,
          path: "/createroom",
        },
        {
          element: <ResetPasswordPage />,
          path: "/resetpasswordteacher",
        },
      ],
    },
    {
      element: <ProtectedRouteStudent allowedRoles={["student"]} />,
      children: [
        {
          element: <MainStudent />,
          path: "/student",
        },
        {
          element: <Form110 />,
          path: "/form110",
        },
        {
          element: <ActivosFijosForm />,
          path: "/activosfijos",
        },
        {
          element: <ESFpatrimonioForm />,
          path: "/esfpatrimonio",
        },
      ],
    },
  ];

  return useRoutes(routes);
};
