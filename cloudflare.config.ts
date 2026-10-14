import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "apex-capital-partners",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-11",
    compatibilityFlags: ["nodejs_compat"],
    assets: { notFoundHandling: "none" },
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      VINEXT_KV_CACHE: { type: "kv", id: "e4cf4bd256764841b4a813b78e25070d" },
    },
  }),
});
