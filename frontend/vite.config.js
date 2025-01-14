import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9005,
    host: true,
    open: true,
    hmr: true,
    proxy: {
      "/api": {
        target: "http://172.20.80.50:9002",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    historyApiFallback: true, // ¡Aquí debe estar!
  },
  build: {
    rollupOptions: {
      input: "./index.html",
    },
  },
});
