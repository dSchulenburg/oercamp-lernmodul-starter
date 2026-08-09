import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Standalone-Modul: base '/' (Klon + `npm run dev` an der Wurzel).
// Fuer Deploy in einen Unterpfad (z. B. /mein-modul/) base entsprechend setzen.
//
// WERKBANK=1 setzt nur der Container (siehe Dockerfile). Dort liegt der
// Quellcode in einem Ordner vom Host, und dann sind zwei Dinge anders:
//   1. Aenderungen an Dateien melden sich nicht von selbst durch die
//      Container-Grenze, der Server muss aktiv nachsehen (usePolling).
//   2. Der Zwischenspeicher gehoert nicht in den Projektordner, sonst legt
//      der Container ein node_modules auf dem Host an.
// Ohne Container bleibt alles beim Alten.
const imContainer = process.env.WERKBANK === '1';

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  ...(imContainer && { cacheDir: process.env.VITE_CACHE_DIR || '/tmp/.vite' }),
  ...(imContainer && {
    server: { watch: { usePolling: true, interval: 300 } },
  }),
});
