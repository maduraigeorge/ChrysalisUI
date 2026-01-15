const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'node_modules', '@expo', 'vector-icons', 'build', 'vendor', 'react-native-vector-icons', 'Fonts');
const destDir = path.resolve(__dirname, '..', 'public', 'fonts');

if (!fs.existsSync(srcDir)) {
  console.error('Source fonts directory not found:', srcDir);
  process.exit(1);
}

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => f.toLowerCase().endsWith('.ttf'));
let copied = 0;
for (const file of files) {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  try {
    fs.copyFileSync(src, dest);
    console.log('Copied', file);
    copied++;
  } catch (err) {
    console.error('Failed to copy', file, err.message);
  }
}

if (copied === 0) {
  console.error('No fonts copied. Are vector icons installed?');
  process.exit(1);
}

console.log(`Done. Copied ${copied} fonts to ${destDir}`);
