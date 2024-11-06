import tutorialkit from '@tutorialkit/astro';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: import.meta.env.VERCEL_URL || 'http://localhost:3000',
  devToolbar: {
    enabled: false,
  },
  integrations: [tutorialkit()],
});
