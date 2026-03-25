// ============================================
// 图片路径批量替换脚本
// 将 Unsplash URL 替换为本地路径
// ============================================

const fs = require('fs');
const path = require('path');

// 文件路径映射
const fileMappings = [
  { file: 'src/data/projects.ts', type: 'projects' },
  { file: 'src/data/news.ts', type: 'news' },
  { file: 'src/lib/real-data.ts', type: 'mixed' },
];

// 图片 URL 映射
const imageMappings = {
  // 风电
  'photo-1532601224476-15c79f2f7a51': '/images/projects/wind-farm.jpg',
  'photo-1466611653911-95081537e5b7': '/images/projects/wind-turbine.jpg',
  'photo-1509391366360-2e959784a276': '/images/projects/wind-offshore.jpg',
  'photo-1548337138-e87d889cc369': '/images/projects/wind-installation.jpg',
  // 光伏
  'photo-1508514177221-188b1cf16e9d': '/images/projects/solar-farm.jpg',
  'photo-1558449028-b53a39d100fc': '/images/projects/solar-rooftop.jpg',
  'photo-1620714223084-8fcacc6dfd8d': '/images/projects/solar-desert.jpg',
  'photo-1497440001374-f26997328c1b': '/images/projects/solar-closeup.jpg',
  // 储能
  'photo-1620288627223-53302f4e8c74': '/images/projects/storage-battery.jpg',
  'photo-1565514020176-dbf2277e4955': '/images/projects/storage-facility.jpg',
  'photo-1473341304170-971dccb5ac1e': '/images/projects/storage-substation.jpg',
  // 业务
  'photo-1554224155-6726b3ff858f': '/images/business/investment.jpg',
  // 团队
  'photo-1560250097-0b93528c311a': '/images/team/member-1.jpg',
  'photo-1472099645785-5658abf4ff4e': '/images/team/member-2.jpg',
  'photo-1573496359142-b8d87734a5a2': '/images/team/member-3.jpg',
  'photo-1580489944761-15a19d654956': '/images/team/member-4.jpg',
  // 其他
  'photo-1586281380349-632531db7ed4': '/images/certificates/iso9001.jpg',
  'photo-1567427017947-545c5f8d16ad': '/images/certificates/award.jpg',
  'photo-1600880292203-757bb62b4baf': '/images/news/meeting.jpg',
  'photo-1497366216548-37526070297c': '/images/about/office.jpg',
  'photo-1522071820081-009f0129c71c': '/images/about/team.jpg',
};

// 替换函数
function replaceImagesInFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`文件不存在: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  let hasChanges = false;
  
  // 替换所有 Unsplash URL
  Object.entries(imageMappings).forEach(([unsplashId, localPath]) => {
    const regex = new RegExp(
      `https://images\\.unsplash\\.com/photo-${unsplashId}[^\'\"]*`,
      'g'
    );
    
    if (regex.test(content)) {
      content = content.replace(regex, localPath);
      hasChanges = true;
      console.log(`  替换: ${unsplashId} -> ${localPath}`);
    }
  });
  
  if (hasChanges) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✅ 已更新: ${filePath}`);
  } else {
    console.log(`⏭️  无变化: ${filePath}`);
  }
}

// 执行替换
console.log('开始替换图片路径...\n');
fileMappings.forEach(({ file }) => {
  replaceImagesInFile(file);
});

console.log('\n完成！');
