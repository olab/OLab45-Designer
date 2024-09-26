import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

const ASSET_URL = process.env.ASSET_URL || '';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '');

  // console.log(JSON.stringify(env, null, 1));

  return {
    base: `${env.VITE_APP_BASEPATH}`,
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            material: ['@mui/material', '@mui/icons-material']
          }
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
    }
  }

})

/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/
