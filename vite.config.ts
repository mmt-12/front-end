import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react({ jsxImportSource: '@emotion/react' }),
    VitePWA({
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
      manifest: false,
    }),
    tsconfigPaths(),
  ],
})
