import esbuild from "esbuild";

const watch = process.argv.includes("--watch");

const options = {
  entryPoints: ["src/comfort-card.ts"],
  bundle: true,
  format: "esm",
  target: "es2019",
  outfile: "comfort-card.js",
  minify: !watch,
  sourcemap: watch,
  legalComments: "none",
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await esbuild.build(options);
  console.log("Build complete: comfort-card.js");
}
