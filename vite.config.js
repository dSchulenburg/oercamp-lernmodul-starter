import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Standalone-Modul: base '/' (Klon + `npm run dev` an der Wurzel).
// Fuer Deploy in einen Unterpfad (z. B. /mein-modul/) base entsprechend setzen.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
});
