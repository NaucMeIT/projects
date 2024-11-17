import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin"

const shared = {
  dts: {
    bundle: false,
  }
}

export default defineConfig({
  lib: [
    {
      ...shared,
      format: 'esm',
      output: {
        target: "web",
        distPath: {
          root: "./dist/esm",
        }
      }
    },
    {
      ...shared,
      format: 'cjs',
      output: {
        target: "web",
        distPath: {
          root: "./dist/cjs",
        }
      }
    },
    {
      ...shared,
      format: "mf",
      output: {
        target: "web",
        distPath: {
          root: "./dist/mf"
        },
        assetPrefix: "http://localhost:3000/mf",
      },
      plugins: [
        pluginModuleFederation({
          name: "lib",
          exposes: {
            ".": "./src/index.tsx"
          },
          shared: ["react", "react-dom"],
          dts: true,
        }),
      ]
    }
  ],
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: 'classic',
      },
    }),
  ],
});
