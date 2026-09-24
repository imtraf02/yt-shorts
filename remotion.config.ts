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

// Disable compositor surface screenshot capture only on Linux if needed
if (process.platform === "linux") {
  process.env.DISABLE_FROM_SURFACE = "true";
}



import fs from "fs";

// Use custom Chrome wrapper on Linux/macOS or system Chrome on Windows
const wrapperScript = path.resolve(process.cwd(), "scripts", "chrome-wrapper.sh");
const defaultWindowsChrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const executable =
  process.env.REMOTION_CHROME_PATH ||
  (process.platform === "win32"
    ? (fs.existsSync(defaultWindowsChrome) ? defaultWindowsChrome : null)
    : (fs.existsSync(wrapperScript) ? wrapperScript : null));

if (executable) {
  Config.setBrowserExecutable(executable);
}


Config.overrideBundlerConfig(enableTailwind);
