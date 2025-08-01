// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  output: "server", // <-- 将输出模式设置为 'server'
  adapter: cloudflare(), // <-- 使用 Cloudflare 适配器
});