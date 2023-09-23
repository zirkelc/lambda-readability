import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
  process.env.VITE_API_URL =
    "https://ldmjalx3mf.execute-api.us-east-1.amazonaws.com/prod/";
  process.env.VITE_API_KEY = "NS1Jf1pxn28egeR7DjWOg1vO4bABKMft2wcQuQH3";

  return {
    plugins: [react()],
    base: "/lambda-readability/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
