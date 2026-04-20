import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve(process.cwd());
const targetDirs = [
  path.join(projectRoot, 'client', 'src', 'assets'),
  path.join(projectRoot, 'client', 'public'),
];
const textDirs = [
  path.join(projectRoot, 'client', 'src'),
  path.join(projectRoot, 'client', 'public'),
  path.join(projectRoot, 'client'),
];

const imageExtensions = new Set(['.png', '.jpg', '.jpeg']);
const textExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.json']);

async function walk(dir, matcher, acc = []) {
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, matcher, acc);
    } else if (matcher(fullPath)) {
      acc.push(fullPath);
    }
  }
  return acc;
}

function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function convertToWebp(filePath) {
  const parsed = path.parse(filePath);
  const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);

  await sharp(filePath)
    .rotate()
    .webp({
      quality: 90,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(webpPath);

  return webpPath;
}

async function updateReferences(mapping) {
  const textFiles = [];
  for (const dir of textDirs) {
    await walk(
      dir,
      (file) => textExtensions.has(path.extname(file).toLowerCase()),
      textFiles
    );
  }

  for (const file of textFiles) {
    let content = await fs.readFile(file, 'utf8');
    let updated = content;

    for (const [fromName, toName] of mapping) {
      const rx = new RegExp(escapeRegExp(fromName), 'g');
      updated = updated.replace(rx, toName);
    }

    if (updated !== content) {
      await fs.writeFile(file, updated, 'utf8');
    }
  }
}

async function run() {
  const imageFiles = [];
  for (const dir of targetDirs) {
    await walk(
      dir,
      (file) => imageExtensions.has(path.extname(file).toLowerCase()),
      imageFiles
    );
  }

  const mapping = new Map();
  for (const image of imageFiles) {
    const webpPath = await convertToWebp(image);
    mapping.set(path.basename(image), path.basename(webpPath));
  }

  await updateReferences(mapping);

  for (const image of imageFiles) {
    try {
      await fs.unlink(image);
    } catch (error) {
      if (error && error.code === 'EPERM') {
        console.warn(`Skipped deleting locked file: ${image}`);
        continue;
      }
      throw error;
    }
  }

  console.log(`Converted ${imageFiles.length} images to .webp and updated references.`);
}

run().catch((error) => {
  console.error('Asset optimization failed:', error);
  process.exit(1);
});
