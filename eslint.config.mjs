// ESLint 9 flat config. Next 16 removed `next lint`, so `bun run lint` calls eslint directly.
import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

export default defineConfig([...nextVitals, ...nextTs, globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])])
