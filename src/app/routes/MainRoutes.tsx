import AuthGuard from "@/shared/ui/AuthGuard";
import MainLayout from "@/shared/ui/layouts/MainLayout";
import { SignIn } from "@/pages/auth/signin";
import { Home } from "@/pages/home";
import { History } from "@/pages/history";
import { Navigate } from "react-router-dom";

const MainRoutes = [
  {
    path: "/",
    element: <Navigate to="home" />,
  },
  { path: "/signin", element: <SignIn /> },
  {
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/history",
        element: <History />,
      },
    ],
  },
];

export default MainRoutes;
