import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const root = path.resolve(process.cwd());
const assetsDir = path.join(root, 'client', 'src', 'assets');
const minSizeBytes = 20 * 1024 * 1024; // 20 MB

async function walk(dir, acc = []) {
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, acc);
    } else if (fullPath.toLowerCase().endsWith('.mp4')) {
      acc.push(fullPath);
    }
  }

  return acc;
}

function runFfmpeg(args) {
  const ffmpegExecutable = ffmpegInstaller?.path || 'ffmpeg';
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn(ffmpegExecutable, args, { stdio: 'inherit' });
    ffmpeg.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg failed with exit code ${code}`));
    });
    ffmpeg.on('error', reject);
  });
}

async function hasFfmpeg() {
  try {
    await runFfmpeg(['-version']);
    return true;
  } catch {
    return false;
  }
}

async function compressVideo(videoPath) {
  const parsed = path.parse(videoPath);
  const outPath = path.join(parsed.dir, `${parsed.name}.compressed.mp4`);
  await runFfmpeg([
    '-y',
    '-i',
    videoPath,
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '23',
    '-movflags',
    '+faststart',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    outPath,
  ]);

  const [originalStat, compressedStat] = await Promise.all([
    fs.stat(videoPath),
    fs.stat(outPath),
  ]);

  if (compressedStat.size < originalStat.size) {
    try {
      await fs.rename(outPath, videoPath);
      return true;
    } catch (error) {
      if (error && error.code === 'EPERM') {
        console.warn(`Could not replace locked file: ${videoPath}. Keeping: ${outPath}`);
        return true;
      }
      throw error;
    }
  }

  await fs.unlink(outPath);
  return false;
}

async function run() {
  const ffmpegReady = await hasFfmpeg();
  if (!ffmpegReady) {
    console.log('ffmpeg not found; skipping video compression.');
    return;
  }

  const videos = await walk(assetsDir);
  let changed = 0;

  for (const video of videos) {
    const stat = await fs.stat(video);
    if (stat.size < minSizeBytes) continue;
    const replaced = await compressVideo(video);
    if (replaced) changed += 1;
  }

  console.log(`Video compression complete. Optimized ${changed} large video(s).`);
}

run().catch((error) => {
  console.error('Video compression failed:', error);
  process.exit(1);
});
