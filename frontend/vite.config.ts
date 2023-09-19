import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// type Outputs = {
//   ApiUrl: string;
//   ApiKey: string;
// };

// https://vitejs.dev/config/
export default defineConfig(() => {
  // const outputs = JSON.parse(
  //   readFileSync("../backend/outputs.json", "utf8"),
  // ) as Outputs;

  // if (!outputs.ApiUrl) throw new Error("Missing output ApiUrl");
  // if (!outputs.ApiKey) throw new Error("Missing output ApiKey");

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
