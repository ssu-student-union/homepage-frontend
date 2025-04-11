import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from './tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

const breakpointsModuleId = 'tailwind:breakpoints';
const breakpoints = fullConfig.theme.screens;

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    {
      name: 'tailwindcss-config-breakpoints',
      resolveId(id) {
        if (id === breakpointsModuleId) {
          return id;
        }
      },
      load(id) {
        if (id === breakpointsModuleId) {
          return `export const breakpoints = ${JSON.stringify(breakpoints)}`;
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
