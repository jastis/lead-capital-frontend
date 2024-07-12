import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/register";
import ResetPassword from "../pages/reset-password";

const Login = lazy(() => import("../pages/Login"));

function UnAuthenticatedRoutes(props) {
  return (
    <Suspense fallback={<p></p>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default UnAuthenticatedRoutes;
