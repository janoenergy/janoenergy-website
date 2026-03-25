const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ============================================
// PWA 图标生成脚本 (使用 Sharp)
// ============================================

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const OUTPUT_DIR = path.join(__dirname, '../public/icons');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 生成 SVG 字符串
function generateSVG(size, text = '江', bgColor = '#10b981', textColor = '#ffffff') {
  const fontSize = Math.floor(size / 2.5);
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="${bgColor}" rx="${size * 0.2}" ry="${size * 0.2}"/>
      <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="${fontSize}" fill="${textColor}" 
            text-anchor="middle" dominant-baseline="middle" font-weight="bold">${text}</text>
    </svg>
  `;
}

// 生成 maskable SVG (带安全边距)
function generateMaskableSVG(size, text = '江', bgColor = '#10b981', textColor = '#ffffff') {
  const padding = Math.floor(size * 0.1);
  const innerSize = size - padding * 2;
  const fontSize = Math.floor(innerSize / 2.5);
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="${bgColor}"/>
      <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="${fontSize}" fill="${textColor}" 
            text-anchor="middle" dominant-baseline="middle" font-weight="bold">${text}</text>
    </svg>
  `;
}

async function generateIcons() {
  console.log('🎨 生成 PWA 图标...\n');

  try {
    // 生成标准图标
    for (const size of SIZES) {
      const svg = generateSVG(size);
      const outputPath = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);
      
      await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);
      
      console.log(`  ✓ 生成 icon-${size}x${size}.png`);
    }

    // 生成 maskable 图标
    for (const size of [192, 512]) {
      const svg = generateMaskableSVG(size);
      const outputPath = path.join(OUTPUT_DIR, `maskable-icon-${size}x${size}.png`);
      
      await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);
      
      console.log(`  ✓ 生成 maskable-icon-${size}x${size}.png`);
    }

    // 生成 Apple Touch Icon
    const appleSvg = generateSVG(180);
    await sharp(Buffer.from(appleSvg))
      .png()
      .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon.png'));
    console.log(`  ✓ 生成 apple-touch-icon.png`);

    // 生成 favicon
    const faviconSvg = generateSVG(32);
    await sharp(Buffer.from(faviconSvg))
      .png()
      .toFile(path.join(OUTPUT_DIR, 'favicon-32x32.png'));
    console.log(`  ✓ 生成 favicon-32x32.png`);

    // 生成 favicon.ico (多尺寸)
    const favicon16 = await sharp(Buffer.from(generateSVG(16))).png().toBuffer();
    const favicon32 = await sharp(Buffer.from(generateSVG(32))).png().toBuffer();
    
    // sharp 不直接支持 ico，我们先用 png
    fs.copyFileSync(
      path.join(OUTPUT_DIR, 'favicon-32x32.png'),
      path.join(__dirname, '../public/favicon.ico')
    );
    console.log(`  ✓ 生成 favicon.ico (使用 32x32 PNG)`);

    console.log('\n✅ 所有图标生成完成!');
    console.log(`📁 图标位置: ${OUTPUT_DIR}/`);
    console.log('\n📝 提示:');
    console.log('   - 当前生成的是占位图标，请替换为实际品牌图标');
    console.log('   - 建议准备设计师提供的品牌 Logo');
    console.log('   - 支持 SVG 格式的源文件最佳');

  } catch (error) {
    console.error('❌ 生成图标失败:', error);
    process.exit(1);
  }
}

generateIcons();
