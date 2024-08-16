import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend
      "/api/v1": {
        target: "https://localhost:3000", // Backend server
        changeOrigin: true,
        secure: false, // Disable for self-signed SSL certificates in development
      },
    },
  },
});
