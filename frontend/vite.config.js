import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(() => {
  // Carga las variables de entorno desde .env
  const env = loadEnv("", process.cwd()); // El primer argumento vacío carga desde .env

  return {
    plugins: [react()],
    server: {
      port: 9005,
      host: "0.0.0.0",
      open: true,
      hmr: true,
      proxy: {
        "/api": {
          target: env.VITE_APP_API_URL_LOCAL,
          changeOrigin: true,
          secure: false,
        },
      },
      historyApiFallback: true,
    },
    build: {
      rollupOptions: {
        input: "./index.html",
      },
    },
  };
});
