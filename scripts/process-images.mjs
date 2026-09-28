import { readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const dir = join(process.cwd(), 'public', 'image', 'transparent');
const files = readdirSync(dir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const path = join(dir, file);
  console.log(`Trimming & fixing: ${file}...`);
  // Trim transparent borders, scale to fit 800x600 canvas centered with transparency
  try {
    execSync(`magick "${path}" -trim +repage -resize 800x800^ -gravity center -background none -extent 800x800 "${path}"`);
  } catch (e) {
    console.error(`Error processing ${file}:`, e.message);
  }
}
console.log('All PNG assets processed and centered!');
