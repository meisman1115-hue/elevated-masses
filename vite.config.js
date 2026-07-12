import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Use the port assigned by the environment (preview server sets PORT),
    // falling back to 5173 for a plain `npm run dev`.
    port: Number(process.env.PORT) || 5173,
  },
})
