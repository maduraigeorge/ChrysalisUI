const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const srcFontsDir = path.join(distDir, 'assets', 'node_modules', '@expo', 'vector-icons', 'build', 'vendor', 'react-native-vector-icons', 'Fonts');
const destDir = path.join(distDir, 'fonts');

if (!fs.existsSync(srcFontsDir)) {
  console.error('Source fonts directory not found in dist:', srcFontsDir);
  process.exit(1);
}

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcFontsDir).filter(f => f.toLowerCase().endsWith('.ttf'));
if (files.length === 0) {
  console.error('No font files found in', srcFontsDir);
  process.exit(1);
}

for (const file of files) {
  const src = path.join(srcFontsDir, file);
  const dest = path.join(destDir, file);
  fs.copyFileSync(src, dest);
  console.log('Copied', file, 'to dist/fonts');
}

// Build fonts.css with common family names pointing to the filenames
const familyMap = [
  ['ionicons', 'Ionicons'],
  ['material', 'MaterialIcons'],
  ['material-community', 'MaterialCommunityIcons'],
  ['FontAwesome', 'FontAwesome'],
  ['FontAwesome5Free-Brand', 'FontAwesome5_Brands'],
  ['FontAwesome5Free-Regular', 'FontAwesome5_Regular'],
  ['FontAwesome5Free-Solid', 'FontAwesome5_Solid'],
];

let css = '';
for (const [family, prefix] of familyMap) {
  const match = files.find(f => f.startsWith(prefix));
  if (match) {
    css += `@font-face{font-family:"${family}";src:url("./${match}") format("truetype");font-display:swap}\n`;
  }
}

const cssPath = path.join(destDir, 'fonts.css');
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Wrote', cssPath);

// Inject link to fonts.css into all HTML files (if not already present)
const walkHtml = dir => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtml(full);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf8');
      if (!content.includes('./fonts/fonts.css')) {
        content = content.replace(/<\/head>/i, `  <link rel="stylesheet" href="./fonts/fonts.css" />\n</head>`);
        fs.writeFileSync(full, content, 'utf8');
        console.log('Injected fonts.css link into', full);
      }
    }
  }
};

walkHtml(distDir);
console.log('Done publishing fonts to dist.');
