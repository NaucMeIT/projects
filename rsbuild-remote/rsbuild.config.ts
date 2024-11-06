import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 4002,
  },
  moduleFederation: {
    options: {
      name: "rsbuild",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx"
      }
    }
  }
});
