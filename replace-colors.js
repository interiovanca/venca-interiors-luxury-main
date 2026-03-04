import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  content = content.replace(/bg-\[#f9f9f9\]/gi, 'bg-background');
  content = content.replace(/bg-\[#f5f0df\]/gi, 'bg-background');

  content = content.replace(/min-h-screen bg-\[#F5F2EC\]/gi, 'min-h-screen bg-background');

  content = content.replace(/bg-\[#F5F2EC\]/gi, 'bg-muted');
  content = content.replace(/hover:bg-\[#F5F2EC\]/gi, 'hover:bg-muted');

  content = content.replace(/border-\[#F5F2EC\]/gi, 'border-border');
  content = content.replace(/border-\[#EAE4D7\]/gi, 'border-border');
  content = content.replace(/border-\[#E1DDD6\]\/50/gi, 'border-border');
  content = content.replace(/border-\[#E1DDD6\]/gi, 'border-border');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('Done replacing light mode colors.');
