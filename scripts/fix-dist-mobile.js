/*
  scripts/fix-dist-mobile.js
  - Walks the dist directory and injects a mobile viewport meta tag into every HTML file.
  - Optionally injects a CSS snippet that scales the mobile layout to fit desktop browsers when
    FORCE_MOBILE_MODE=scale is set in the environment.
  - Usage: node scripts/fix-dist-mobile.js
*/

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const VIEWPORT_WIDTH = process.env.FORCE_MOBILE_WIDTH || '375';
const MODE = process.env.FORCE_MOBILE_MODE || 'narrow'; // 'narrow' or 'scale'

function walkDir(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) walkDir(filePath, filelist);
    else filelist.push(filePath);
  });
  return filelist;
}

function injectMobileIntoHtml(file) {
  if (!file.endsWith('.html')) return;
  let html = fs.readFileSync(file, 'utf8');

  // Mobile viewport meta to enforce mobile layout width
  const mobileViewport = `<meta name="viewport" content="width=${VIEWPORT_WIDTH}, initial-scale=1, maximum-scale=1, user-scalable=no">`;

  if (/name=["']viewport["']/.test(html)) {
    html = html.replace(/<meta[^>]*name=["']viewport["'][^>]*>/i, mobileViewport);
  } else if (/<head[^>]*>/i.test(html)) {
    html = html.replace(/<head([^>]*)>/i, `<head$1>\n  ${mobileViewport}`);
  } else {
    // no <head> tag (unlikely) - just prepend
    html = `${mobileViewport}\n${html}`;
  }

  // Optional scaling CSS (scales the mobile layout to fill a desktop viewport)
  if (MODE === 'scale') {
    const scaleCssId = 'force-mobile-style';
    const scaleCss = `\n<style id="${scaleCssId}">\n  html,body{height:100%}\n  body{overflow-x:hidden}\n  /* scale mobile viewport (assumes mobile width ${VIEWPORT_WIDTH}px) */\n  #root, #__expo, #__next, html > body > div:first-of-type {\n    transform-origin: 0 0;\n    transform: scale(calc(100vw / ${VIEWPORT_WIDTH}));\n    width: ${VIEWPORT_WIDTH}px;\n  }\n</style>\n`;

    if (!html.includes(`id="${scaleCssId}"`)) {
      html = html.replace(/<\/head>/i, `${scaleCss}\n</head>`);
    }
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log(`Patched ${path.relative(DIST_DIR, file)}`);
}

if (!fs.existsSync(DIST_DIR)) {
  console.error('dist directory not found. Run export first.');
  process.exit(0);
}

const files = walkDir(DIST_DIR);
const htmlFiles = files.filter(f => f.endsWith('.html'));
if (htmlFiles.length === 0) {
  console.warn('No HTML files found in dist to patch.');
  process.exit(0);
}

htmlFiles.forEach(injectMobileIntoHtml);
console.log(`Injected mobile viewport into ${htmlFiles.length} HTML file(s) (mode=${MODE}).`);
