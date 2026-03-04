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

  // Replace bg-white where it acts as a card background in newly created pages
  // E.g: className="bg-white rounded-[2rem] p-4..."
  // It should be bg-card
  // We'll replace bg-white carefully. Only when it's part of a card component (e.g. together with shadow, rounded, border)

  // Actually, the original older pages might have used bg-white. But the prompt says "ensure consistent usage of bg-background bg-muted or the project's defined off-white variable".
  // Let's replace "bg-white " with "bg-card " or "bg-card" if it's meant to be a panel.

  // In `CheckoutPage.tsx`
  content = content.replace(/bg-white dark:bg-\[#0a0a0a\]/g, 'bg-card');
  content = content.replace(/bg-white text-\[#A79D93\] border-2/g, 'bg-card text-[#A79D93] border-2');

  // In UserDashboard, Orders, Wishlist, OrderTracking, AccountSettings
  // Replace plain `bg-white ` string when there's a padding or rounded class next to it.
  content = content.replace(/className="([^"]*)bg-white ([^"]*rounded-[^"]*)/g, 'className="$1bg-card $2');
  content = content.replace(/className="([^"]*rounded-[^"]*) bg-white([^"]*)/g, 'className="$1 bg-card$2');
  content = content.replace(/className="bg-white/g, 'className="bg-card');
  // Revert back some safe ones if needed, but in standard Tailwind, `bg-card` takes its color from the theme.

  // Reverting bg-white in specific text or gradient utility where it doesn't make sense: none.

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('Done replacing bg-white with bg-card.');
