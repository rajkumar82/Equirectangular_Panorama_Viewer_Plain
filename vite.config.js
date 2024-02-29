// vite.config.js
/** @type {import('vite').UserConfig} */
export default {
  // config options
  root: "src",
  publicDir: "static",
  server: {
    host: true
  },
  build: {
    outDir: "../dist",
    minify: true,
    sourcemap: true,
    emptyOutDir: true


  }



}