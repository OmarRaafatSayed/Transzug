import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'images');

const images = [
  { url: 'https://transzug-fluent-move.lovable.app/assets/hero-1-f6-wurAi.jpg', filename: 'hero-1.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/hero-2-rucYQocL.jpg', filename: 'hero-2.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/hero-3-CeVbKbMd.jpg', filename: 'hero-3.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/hero-4-Dbx0zehp.jpg', filename: 'hero-4.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/about-team-Cdzeks2H.jpg', filename: 'about-team.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/svc-privat-C-u7y18P.jpg', filename: 'service-privatumzug.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/svc-firma-D5WqSvyO.jpg', filename: 'service-firmenumzug.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/svc-senior-DiwMZ8hG.jpg', filename: 'service-seniorenumzug.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/svc-lager-Ce8AGNwQ.jpg', filename: 'service-moebellagerung.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/svc-entruempel-U1CSY6Ce.jpg', filename: 'service-entruempelung.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/svc-fern-CVb7KUbT.jpg', filename: 'service-fernumzug.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/svc-lkw-BZF6Snl7.jpg', filename: 'service-lkw.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/lkw-logistics-Do6zNK2-.jpg', filename: 'lkw-logistics.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/after-BcXZmAm2.jpg', filename: 'before-after-after.jpg' },
  { url: 'https://transzug-fluent-move.lovable.app/assets/before-Dm_WJnXJ.jpg', filename: 'before-after-before.jpg' }
];

async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to download ${url}`);
    const buffer = await response.arrayBuffer();
    await writeFile(filepath, Buffer.from(buffer));
    console.log(`✓ Downloaded: ${filepath}`);
  } catch (error) {
    console.error(`✗ Failed: ${filepath}`, error.message);
  }
}

async function main() {
  // Create public/images directory
  await mkdir(publicDir, { recursive: true });
  console.log('📁 Created directory:', publicDir);
  
  // Download all images (4 at a time)
  const batchSize = 4;
  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize);
    await Promise.all(
      batch.map(img => downloadImage(img.url, join(publicDir, img.filename)))
    );
  }
  
  console.log('\n🎉 All images downloaded!');
}

main().catch(console.error);
