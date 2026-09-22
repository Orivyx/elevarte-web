import { spawnSync } from "node:child_process";
import ffmpeg from "@ffmpeg-installer/ffmpeg";
import sharp from "sharp";
const source =
  "refs/hailuo-2_3_Animate_the_provided_branding_mockup_into_a_sophisticated_cinematic_luxury_brand-0.mp4";
function run(args) {
  const result = spawnSync(
    ffmpeg.path,
    ["-hide_banner", "-loglevel", "error", ...args],
    { stdio: "inherit" },
  );
  if (result.status !== 0) throw new Error("Video preparation failed");
}
run([
  "-i",
  source,
  "-an",
  "-c:v",
  "libx264",
  "-preset",
  "medium",
  "-crf",
  "12",
  "-g",
  "1",
  "-keyint_min",
  "1",
  "-sc_threshold",
  "0",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  "-y",
  "public/assets/tatiana-scroll-v1.mp4",
]);
run([
  "-i",
  source,
  "-frames:v",
  "1",
  "-y",
  "artifacts/tatiana-poster.png",
]);
await sharp("artifacts/tatiana-poster.png")
  .webp({ lossless: true })
  .toFile("public/assets/tatiana-film-poster.webp");
