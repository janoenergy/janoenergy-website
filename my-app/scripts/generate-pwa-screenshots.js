const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ============================================
// PWA 截图生成脚本
// 生成安装提示用的截图占位图
// ============================================

const OUTPUT_DIR = path.join(__dirname, '../public/screenshots');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 生成截图 SVG
function generateScreenshotSVG(width, height, title, subtitle, isMobile = false) {
  const bgColor = '#10b981';
  const textColor = '#ffffff';
  const secondaryColor = '#ecfdf5';
  
  const titleSize = isMobile ? 48 : 64;
  const subtitleSize = isMobile ? 24 : 32;
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#10b981"/>
          <stop offset="100%" style="stop-color:#059669"/>
        </linearGradient>
      </defs>
      
      <!-- 背景 -->
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      
      <!-- 装饰圆 -->
      <circle cx="${width * 0.8}" cy="${height * 0.2}" r="${width * 0.15}" fill="rgba(255,255,255,0.1)"/>
      <circle cx="${width * 0.1}" cy="${height * 0.8}" r="${width * 0.2}" fill="rgba(255,255,255,0.05)"/>
      
      <!-- 内容区域 -->
      <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="${titleSize}" fill="${textColor}" 
            text-anchor="middle" font-weight="bold">${title}</text>
      <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="${subtitleSize}" fill="${secondaryColor}" 
            text-anchor="middle">${subtitle}</text>
      
      <!-- 底部提示 -->
      <text x="50%" y="85%" font-family="Arial, sans-serif" font-size="${isMobile ? 16 : 20}" fill="rgba(255,255,255,0.7)" 
            text-anchor="middle">江能集团 JanoEnergy</text>
    </svg>
  `;
}

async function generateScreenshots() {
  console.log('📸 生成 PWA 截图...\n');

  try {
    // 桌面端截图 (1280x720)
    const desktopSvg = generateScreenshotSVG(1280, 720, '江能集团', '清洁能源，绿色未来');
    await sharp(Buffer.from(desktopSvg))
      .png()
      .toFile(path.join(OUTPUT_DIR, 'home.png'));
    console.log('  ✓ 生成桌面端截图 (1280x720)');

    // 桌面端截图 #2 - 关于我们
    const aboutSvg = generateScreenshotSVG(1280, 720, '关于我们', '专注新能源，创造绿色价值');
    await sharp(Buffer.from(aboutSvg))
      .png()
      .toFile(path.join(OUTPUT_DIR, 'about.png'));
    console.log('  ✓ 生成关于我们截图 (1280x720)');

    // 移动端截图 (750x1334 - iPhone 尺寸)
    const mobileSvg = generateScreenshotSVG(750, 1334, '江能集团', '随时随地了解新能源动态', true);
    await sharp(Buffer.from(mobileSvg))
      .png()
      .toFile(path.join(OUTPUT_DIR, 'mobile.png'));
    console.log('  ✓ 生成移动端截图 (750x1334)');

    // 移动端截图 #2 - 窄屏
    const narrowSvg = generateScreenshotSVG(750, 1334, '业务领域', '风电 · 光伏 · 储能', true);
    await sharp(Buffer.from(narrowSvg))
      .png()
      .toFile(path.join(OUTPUT_DIR, 'mobile-narrow.png'));
    console.log('  ✓ 生成移动端截图 #2 (750x1334)');

    console.log('\n✅ 截图生成完成!');
    console.log(`📁 截图位置: ${OUTPUT_DIR}/`);
    console.log('\n📝 提示:');
    console.log('   - 当前生成的是占位截图');
    console.log('   - 建议替换为真实网站截图');
    console.log('   - 使用浏览器 DevTools 的设备模拟功能截取');
    console.log('   - 推荐工具: Chrome DevTools, ScreenshotOne, Puppeteer');

  } catch (error) {
    console.error('❌ 生成截图失败:', error);
    process.exit(1);
  }
}

generateScreenshots();
