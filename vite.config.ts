import { resolve, sep } from 'path'
import { defineConfig } from 'vite'
import { manifestMerge } from './plugins/manifest';
import { viteStaticCopy } from 'vite-plugin-static-copy'

const staticAssets = [
  'src/assets/icons/16.png',
]

export default defineConfig({
  plugins: [
    manifestMerge({
      output: "manifest.json",
      files: [
        resolve(__dirname, 'src/assets/manifest.common.json'),
        resolve(__dirname, 'src/assets/manifest.chrome.json')
      ]
    }),
    viteStaticCopy({
      targets: staticAssets.map(file => ({
        src: resolve(__dirname, file),
        dest: resolve(__dirname, file.replace(/^src/, 'dist')),
      }))
    })
  ],
  root: "src",
  build: {
    minify: false,
    rollupOptions: {
      output: [{
        dir: "dist",
        format: "es",
        exports: "named",
      }],
      input: {
        popup: resolve(__dirname, 'src/popup.html'),
        worker: resolve(__dirname, 'src/index.ts'),
      },
    },
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), // needed for it to work at all
      fileName(format, entryName) {
        return entryName + ".js";
      },
    },
  },
})
