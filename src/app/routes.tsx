import { type JSX } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useUserStore } from "../entities/user/slice/userStore.ts";
import { HomePage, LogInPage } from "../pages";

export const AppRoutes = () => {
  const accessToken = useUserStore.getState().accessToken;

  return (
    <Routes>
      <Route
        path="/login"
        element={accessToken ? <Navigate to="/" replace /> : <LogInPage />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = useUserStore.getState().accessToken;
  return accessToken ? children : <Navigate to="/login" replace />;
};
