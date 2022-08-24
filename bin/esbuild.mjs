import esbuild from "esbuild"

esbuild.build({
  entryPoints: ["src/index.tsx"],
  outdir: "./build/static/js",
  bundle: true,
  minify: process.argv.includes("--minify"),
  sourcemap: process.argv.includes("--sourcemap"),
}).catch(e => console.error(e.message))
