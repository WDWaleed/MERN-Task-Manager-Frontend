import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/MERN-Task-Manager/",
  // server: {
  //   port: 3001,
  // },
});
