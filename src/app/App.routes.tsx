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
      element: <MainStudent />,
      path: "/student",
    },
    {
      element: <MiddlewareStudent />,
      path: "/middlewarestudent",
    },
    {
      element: <MainAdminPage />,
      path: "/admin",
    },
    {
      element: <MainProfessorPage />,
      path: "/professor",
    },
    {
      element: <CreateProfessorPage />,
      path: "/createprofessor",
    },
    {
      element: <CreateRoomPage />,
      path: "/createroom",
    },
    {
      element: <ResetPasswordPage />,
      path: "/resetpasswordteacher",
    },
    {
      element: <UpdateInfoAdminPage />,
      path: "/updateinfoadmin",
    },
    {
      element: <Form110 />,
      path: "/form110"
    }
  ];

  return useRoutes(routes);
};
