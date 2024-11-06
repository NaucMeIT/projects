import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from "@module-federation/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      filename: "remoteEntry.js",
      dts: true,
      remotes: {
        vite: {
          name: "vite",
          type: "module",
          entry: "http://localhost:4001/remoteEntry.js"
        },
        rsbuild: {
          name: "rsbuild",
          type: "var",
          entry: "http://localhost:4002/remoteEntry.js"
        },
        lib: {
          name: "lib",
          type: "module",
          entry: "http://localhost:3001/mf/mf-manifest.json",
        }
      },
      shared: ["react", "react-dom"]
    })
  ],
  build: {
    target: "chrome89",
  }
})
