import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Main from "./layouts/Main.tsx";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { Toaster } from "sonner";
import Profile from "./pages/Profile.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ForgotPassword from "./components/profile/ForgotPassword.tsx";
import ProductFilter from "./pages/ProductFilter.tsx";
import IsLogin from "./pages/protector/IsLogin.tsx";
import IsAdmin from "./pages/protector/IsAdmin.tsx";
import Panel from "./pages/admin/Panel.tsx";
import ProductCreate from "./pages/admin/ProductCreate.tsx";
// import Profile from './pages/Profile.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/reset-password/:id",
        element: <ResetPassword />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/products/filter",
        element: <ProductFilter />,
      },
      {
        path: "/profile",
        element: (
          <IsLogin>
            <Profile />
          </IsLogin>
        ),
      },
      {
        path: "/admin",
        element: (
          <IsAdmin>
            <Panel />
          </IsAdmin>
        ),
        children: [
          {
            path: "create-product",
            element: <ProductCreate />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster richColors />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
