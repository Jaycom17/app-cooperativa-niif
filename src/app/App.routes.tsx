import { useRoutes } from 'react-router-dom'
import LoginPage from '../auth/pages/LoginPage'
import MainPage from '../auth/pages/MainPage'
import MainStudent from '../student/pages/MainStudent'
import MiddlewareStudent from '../student/pages/MiddlewareStudent'
import MainAdminPage from '../admin/pages/MainAdminPage'
import MainProfessorPage from '../professor/pages/MainProfessorPage'

export const AppRoutes = () => {
  const routes = [
    {
      element: <LoginPage />,
      path: '/login',
    },
    {
      element: <MainPage />,
      path: '/',
    },
    {
      element: <MainStudent />,
      path: '/student',
    },
    {
      element: <MiddlewareStudent />,
      path: '/middlewarestudent'
    },
    {
      element: <MainAdminPage />,
      path: '/admin'
    },
    {
      element: <MainProfessorPage />,
      path: '/professor'
    },
  ]

  return useRoutes(routes)
}
