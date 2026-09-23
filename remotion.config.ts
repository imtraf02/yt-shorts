// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

import path from "path";
import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Set concurrency to 2 on 4-core machine to prevent CPU starvation of raster threads
Config.setConcurrency(2);

// CRITICAL FIX: Disable compositor surface screenshot capture
// This forces Chrome CDP to capture directly from the DOM bitmap synchronously,
// eliminating missing software tiles and black glitch frames under CPU-only rendering.
process.env.DISABLE_FROM_SURFACE = "true";


// Use custom Chrome wrapper that enforces synchronous, complete compositor stages before draw
const wrapperScript = path.resolve(process.cwd(), "scripts", "chrome-wrapper.sh");
Config.setBrowserExecutable(
  process.env.REMOTION_CHROME_PATH || wrapperScript
);

Config.overrideBundlerConfig(enableTailwind);
