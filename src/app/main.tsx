import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import { AppRoutes } from "./routes.tsx";

// @ts-ignore
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    if (confirm("Обновить приложение до новой версии?")) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log("PWA готово к офлайн-работе 💪");
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>,
);
