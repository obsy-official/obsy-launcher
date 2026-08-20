import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";

const rootDir = path.resolve(__dirname, "..");
const addonsBaseDir = path.join(rootDir, "addons");
const addonsSrcDir = path.join(addonsBaseDir, "src");
const addonsDistDir = path.join(addonsBaseDir, "dist");
const catalogJsonPath = path.join(addonsBaseDir, "catalog.json");

if (!fs.existsSync(addonsDistDir)) {
  fs.mkdirSync(addonsDistDir, { recursive: true });
}

if (!fs.existsSync(addonsSrcDir)) {
  console.error(`Addons source directory does not exist: ${addonsSrcDir}`);
  process.exit(1);
}

const addonDirs = fs
  .readdirSync(addonsSrcDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

console.log(`Building ${addonDirs.length} addon zip archives...`);

const catalogList: any[] = [];

for (const addonId of addonDirs) {
  const addonDir = path.join(addonsSrcDir, addonId);
  const manifestPath = path.join(addonDir, "addon.json");

  if (!fs.existsSync(manifestPath)) {
    console.warn(`Skipping ${addonId}: addon.json not found.`);
    continue;
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  const srcEntry = [
    path.join(addonDir, "src", "index.js"),
    path.join(addonDir, "src", "index.tsx"),
    path.join(addonDir, "src", "index.ts"),
  ].find((p) => fs.existsSync(p));

  if (srcEntry) {
    const buildRes = await Bun.build({
      entrypoints: [srcEntry],
      outdir: addonDir,
      naming: "index.js",
      target: "browser",
      format: "esm",
      minify: true,
      external: ["react", "react-dom"],
    });

    if (!buildRes.success) {
      console.error(`Failed to build ${addonId}:`, buildRes.logs);
      process.exit(1);
    }
  }

  const zipOutput = path.join(addonsDistDir, `${addonId}.zip`);

  if (fs.existsSync(zipOutput)) {
    fs.unlinkSync(zipOutput);
  }

  // Use system zip command to archive files inside the addon folder (excluding src/)
  execSync(
    `cd "${addonDir}" && zip -r "${zipOutput}" . -x "*.DS_Store" -x "src/*"`,
    {
      stdio: "inherit",
    },
  );

  const fileBuffer = fs.readFileSync(zipOutput);
  const stats = fs.statSync(zipOutput);
  const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

  manifest.sizeBytes = stats.size;
  manifest.checksum = hash;
  manifest.downloadUrl = `https://raw.githubusercontent.com/obsy-official/obsy-launcher/main/addons/dist/${addonId}.zip`;

  catalogList.push(manifest);
  console.log(
    `✓ Built ${addonId}.zip (${stats.size} bytes, sha256: ${hash.slice(0, 8)}...)`,
  );
}

const catalogJsonContent = JSON.stringify(catalogList, null, 2) + "\n";
fs.writeFileSync(catalogJsonPath, catalogJsonContent, "utf-8");

console.log(`✓ Generated ${catalogJsonPath} (${catalogList.length} addons)`);
console.log(`✓ Addon archives output directory: ${addonsDistDir}`);
console.log("All addon zip archives built successfully!");
