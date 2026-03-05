import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public', 'assets', 'images');
const srcDir = path.join(process.cwd(), 'src');

const categories = ['products', 'collections', 'banners', 'backgrounds', 'ui'];
categories.forEach(c => fs.mkdirSync(path.join(publicDir, c), { recursive: true }));

const downloadAndConvert = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadAndConvert(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status: ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          await sharp(buffer).webp({ quality: 80 }).toFile(dest);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

function getCategory(filePath, url) {
  const lowerPath = filePath.toLowerCase();
  if (lowerPath.includes('product') || lowerPath.includes('search')) return 'products';
  if (lowerPath.includes('collection') || lowerPath.includes('wishlist') || lowerPath.includes('order')) return 'collections';
  if (url.includes('svgrepo') || url.indexOf('icon') !== -1 || lowerPath.includes('login') || lowerPath.includes('account')) return 'ui';
  if (lowerPath.includes('dashboard') || lowerPath.includes('css')) return 'backgrounds';
  return 'banners';
}

const urlMap = new Map();
let currentId = 1;

async function run() {
  const files = [];
  walkDir(srcDir, (p) => {
    if (p.match(/\.(tsx|ts|jsx|js|css)$/)) files.push(p);
  });

  const urlRegex = /https:\/\/([a-zA-Z0-9\-\.]+\/[a-zA-Z0-9\-\.\/%\?=&#_]*)/g;

  // Gather URLs
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = urlRegex.exec(content)) !== null) {
      const url = match[0];
      if (url.includes('api') || url.includes('fonts.googleapis') || url.includes('github') || url.includes('fonts.gstatic') || url === 'https://fonts.googleapis.com; font-src ') continue; // skip non-images
      if (!urlMap.has(url)) {
        const cat = getCategory(file, url);
        const filename = `${cat}-${currentId++}.webp`;
        urlMap.set(url, { category: cat, filename, dest: path.join(publicDir, cat, filename), localUrl: `/assets/images/${cat}/${filename}` });
      }
    }
  }

  // Fallback / placeholder generator
  await sharp({
    create: { width: 300, height: 300, channels: 4, background: { r: 240, g: 240, b: 240, alpha: 1 } }
  }).webp().toFile(path.join(publicDir, 'ui', 'placeholder.webp'));

  console.log(`Found ${urlMap.size} unique image URLs to process.`);

  // Download & Convert
  for (const [url, info] of urlMap.entries()) {
    console.log(`Downloading ${url} -> ${info.localUrl}`);
    try {
      await downloadAndConvert(url, info.dest);
    } catch (e) {
      console.error(`Failed to download ${url}: ${e.message}`);
      // Fallback to placeholder if failed
      info.localUrl = `/assets/images/ui/placeholder.webp`;
    }
  }

  // Replace in files
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    for (const [url, info] of urlMap.entries()) {
      if (content.includes(url)) {
        content = content.split(url).join(info.localUrl);
        modified = true;
      }
    }
    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }

  console.log("Done!");
}

run().catch(console.error);
