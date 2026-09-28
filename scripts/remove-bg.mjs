import { readdirSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const imgDir = join(process.cwd(), 'public', 'image');
const outDir = join(process.cwd(), 'public', 'image', 'transparent');

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const files = readdirSync(imgDir).filter(f => f.endsWith('.jpg') && f !== 'Bali-Workspace.jpg');

for (const file of files) {
  const src = join(imgDir, file);
  const dest = join(outDir, file.replace('.jpg', '.png'));
  console.log(`Processing: ${file}...`);
  // ImageMagick command to turn white background transparent
  // -fuzz 20% -transparent white
  try {
    execSync(`magick convert "${src}" -fuzz 25% -transparent white "${dest}"`);
  } catch (e) {
    console.error(`Failed on ${file}:`, e.message);
  }
}
console.log('Done transparent conversion!');
