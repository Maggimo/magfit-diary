import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo.svg"],
      manifest: {
        id: "/",
        name: "MagFitDiary",
        short_name: "MagFitDiary",
        description: "Фитнес-дневник тренировок",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/logo.svg",
            type: "image/svg+xml",
            sizes: "512x512",
          },
        ],
        shortcuts: [
          {
            name: "Training Day",
            description: "View trainings for today",
            url: "/",
            icons: [
              {
                src: "/pageScreen/trainingDay.png",
                sizes: "1170x2532",
                type: "image/png",
              },
            ],
          },
        ],
        screenshots: [
          {
            src: "/pageScreen/trainingDay.png",
            type: "image/png",
            sizes: "1170x2532",
            form_factor: "narrow",
          },
          {
            src: "/pageScreen/exerciseList.png",
            type: "image/png",
            sizes: "1170x2532",
            form_factor: "narrow",
          },
          {
            src: "/pageScreen/timer.png",
            type: "image/png",
            sizes: "1170x2532",
            form_factor: "narrow",
          },
          {
            src: "/pageScreen/addExercise.png",
            type: "image/png",
            sizes: "1170x2532",
            form_factor: "narrow",
          },
          {
            src: "/pageScreen/trainingWide.png",
            type: "image/png",
            sizes: "2360x1640",
            form_factor: "wide",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/magfit-diary-backend\.onrender\.com\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              ["document", "script", "style", "image", "font"].includes(
                request.destination,
              ),
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: "127.0.0.1",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/ui": path.resolve(__dirname, "./src/shared/ui"),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        // ⬇️ вместо manualChunks используем advancedChunks
        advancedChunks: {
          groups: [
            // React в отдельный бандл
            { name: "react", test: /node_modules\/react(|-dom)\// },

            // Radix/shadcn
            { name: "radix", test: /node_modules\/@radix-ui\// },

            // Графики (пример)
            { name: "recharts", test: /node_modules\/recharts\// },
            { name: "motion", test: /node_modules\/framer-motion\// },

            // Ваши тяжёлые внутренние виджеты
            { name: "widgets", test: /src\/shared\/ui\/widgets\// },
          ],
        },
      },
    },
  },
});
