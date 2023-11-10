import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [basicSsl(), wasm()],
  server: {
    host: "localhost",
    port: 5173,
    https: true,
  },
});
