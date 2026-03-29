import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const brands = [
  { name: 'Caterpillar', color: '#FFB700', url: 'https://www.caterpillar.com' },
  { name: 'Komatsu', color: '#1312C2', url: 'https://www.komatsu.com' },
  { name: 'SANY', color: '#E4002B', url: 'https://www.sanyglobal.com' },
  { name: 'Volvo', color: '#002E5F', url: 'https://www.volvoce.com' },
  { name: 'SDLG', color: '#FFD700', url: 'https://www.sdlg.com' },
  { name: 'Shantui', color: '#005BBB', url: 'https://www.shantui.com' },
  { name: 'JCB', color: '#FFCC00', url: 'https://www.jcb.com' },
  { name: 'CASE', color: '#D60000', url: 'https://www.casece.com' },
  { name: 'Maersk', color: '#00243D', url: 'https://www.maersk.com' },
  { name: 'DHL', color: '#FFCC00', url: 'https://www.dhl.com' },
  { name: 'XCMG', color: '#0054A6', url: 'https://www.xcmg.com' },
  { name: 'LIEBHERR', color: '#FFCC00', url: 'https://www.liebherr.com' },
];

const publicBrandsDir = path.join(process.cwd(), 'public', 'brands');
if (!fs.existsSync(publicBrandsDir)) {
  fs.mkdirSync(publicBrandsDir, { recursive: true });
}

function generateSvgContent(name, color) {
  // A clean, SEO-optimized SVG wordmark.
  // Using a generic sans-serif font-family, viewBox ensures scalability.
  return `<!-- ${name} wordmark for Dar Chang Global -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80" aria-label="${name} - Heavy Equipment Partner">
  <title>${name} - Heavy Equipment Partner</title>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="32" font-weight="900" fill="${color}" text-anchor="middle" dominant-baseline="middle" letter-spacing="-0.5">
    ${name.toUpperCase()}
  </text>
</svg>`;
}

async function main() {
  for (const brand of brands) {
    const filenameBase = brand.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const svgPath = path.join(publicBrandsDir, `${filenameBase}-logo.svg`);
    const webpPath = path.join(publicBrandsDir, `${filenameBase}-logo.webp`);
    
    // 1. Generate SVG
    const svgContent = generateSvgContent(brand.name, brand.color);
    fs.writeFileSync(svgPath, svgContent);
    console.log(`Created SVG: ${svgPath}`);
    
    // 2. Rasterize to WEBP using sharp
    // We convert the SVG Buffer to WEBP. Sharp handles SVGs cleanly.
    await sharp(Buffer.from(svgContent))
      .resize(200, 80)
      .webp({ quality: 90 })
      .toFile(webpPath);
    
    console.log(`Created WEBP: ${webpPath}`);
  }
}

main().catch(console.error);
