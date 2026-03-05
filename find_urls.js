const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

const urls = new Set();
walkDir('./src', (filePath) => {
  if (filePath.match(/\.(tsx|ts|css|html)$/)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(/https?:\/\/[^\s"'`\)]+/g);
    if (matches) {
      matches.forEach(m => urls.add(m));
    }
  }
});
console.log(Array.from(urls).join('\n'));
