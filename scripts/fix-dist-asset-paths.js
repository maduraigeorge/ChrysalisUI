const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const exts = new Set(['.html', '.js', '.css']);
let changedFiles = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (exts.has(path.extname(entry.name))) processFile(full);
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace occurrences like "/assets/..." -> "./assets/..." and "/_expo/..." -> "./_expo/..."
  content = content.replace(/(["'\(])\/assets\//g, '$1./assets/');
  content = content.replace(/(["'\(])\/_expo\//g, '$1./_expo/');
  content = content.replace(/(["'\(])\/favicon\.ico/g, '$1./favicon.ico');

  // Also handle src/href preloads and url(...) patterns
  content = content.replace(/url\((['"])?\/assets\//g, "url($1./assets/");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    changedFiles++;
    console.log('Patched', filePath);
  }
}

if (!fs.existsSync(DIST_DIR)) {
  console.error('dist folder not found at', DIST_DIR);
  process.exit(1);
}

walk(DIST_DIR);
console.log(`Done. Patched ${changedFiles} files.`);
