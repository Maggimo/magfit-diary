import { type JSX, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import { HomePage, TimerPage, ExercisePage } from "@/pages";

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const TimerPage = lazy(() =>
  import("@/pages/TimerPage").then((m) => ({ default: m.TimerPage })),
);
const ExercisePage = lazy(() =>
  import("@/pages/ExercisePage").then((m) => ({ default: m.ExercisePage })),
);

export const AppRoutes = () => {
  // const accessToken = useUserStore.getState().accessToken;

  return (
    <Routes>
      {/*<Route*/}
      {/*  path="/login"*/}
      {/*  element={accessToken ? <Navigate to="/" replace /> : <LogInPage />}*/}
      {/*/>*/}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exercises"
        element={
          <ProtectedRoute>
            <ExercisePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timer"
        element={
          <ProtectedRoute>
            <TimerPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // const accessToken = useUserStore.getState().accessToken;
  // return accessToken ? children : <Navigate to="/login" replace />;
  return children;
};
