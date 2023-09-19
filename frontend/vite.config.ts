import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => {
  // TODO read from the cdk stack
  process.env.VITE_API_URL =
    "https://v32y6ymgl1.execute-api.eu-west-1.amazonaws.com/prod/";
  process.env.VITE_API_KEY = "6wSNmkfeoR7exg4rnjmO59NmhaAvgtUOGhSF72Eh";
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
