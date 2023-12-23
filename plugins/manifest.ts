import { PluginOption, ResolvedConfig } from "vite";
import path from "path";
import fs from "fs";
import merge from "lodash.merge";

export type ManifestMergerOptions = {
  output: string;
  files: string[];
}

function mergeManifests(inputs: string[]): string {
  const parsed = inputs.map(v => JSON.parse(v));
  const output = {};
  const merged = merge(output, ...parsed);
  return JSON.stringify(merged, null, 2);
}

export const manifestMerge = (options: ManifestMergerOptions): PluginOption[] => {
  const inputFiles = options.files.map(v=>fs.readFileSync(v, 'utf8'));
  let config: ResolvedConfig | null = null;
  let distPath: string | null = null;

  return [
    {
      name: 'manifest-merger',
      configResolved(resolvedConfig) {
        config = resolvedConfig
        distPath = path.resolve(config.build.outDir)
      },
      closeBundle() {
        if (!config || !distPath) return
        if (config.command === 'serve') {
          return
        }

        fs.writeFileSync(
          path.join(distPath ?? "", options.output),
          mergeManifests(inputFiles),
          {
            encoding: 'utf8',
          }
        )
      }
    },
  ]
}
