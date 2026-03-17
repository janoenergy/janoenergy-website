const { Client } = require('pg');

const businessSections = [
  {
    section_id: 'development',
    title: '新能源开发',
    title_en: 'New Energy Development',
    subtitle: '风光资源获取与项目孵化',
    subtitle_en: 'Wind & Solar Resource Acquisition',
    description: '专注于风电、光伏等新能源项目的前期开发，包括资源评估、选址规划、手续办理等全流程服务。',
    description_en: 'Focus on early-stage development of wind and solar projects, including resource assessment, site planning, and permit processing.',
    features: ['资源评估与选址', '项目立项审批', '电网接入申请', '土地手续办理'],
    features_en: ['Resource Assessment', 'Project Approval', 'Grid Connection', 'Land Permits']
  },
  {
    section_id: 'investment',
    title: '新能源投资',
    title_en: 'New Energy Investment',
    subtitle: '优质资产收购与股权投资',
    subtitle_en: 'Quality Asset Acquisition',
    description: '通过直接投资、并购等方式，布局优质新能源资产，为投资者创造稳定收益。',
    description_en: 'Deploy capital through direct investment and M&A to build quality new energy assets.',
    features: ['项目尽调评估', '投资收益分析', '资产并购整合', '投后管理服务'],
    features_en: ['Due Diligence', 'ROI Analysis', 'M&A Integration', 'Asset Management']
  },
  {
    section_id: 'epc',
    title: 'EPC总承包',
    title_en: 'EPC Contracting',
    subtitle: '一站式工程建设服务',
    subtitle_en: 'Turnkey Engineering Services',
    description: '提供从设计、采购到施工的全流程EPC服务，确保项目高质量按期交付。',
    description_en: 'Provide comprehensive EPC services from design to construction.',
    features: ['工程设计优化', '设备采购管理', '工程施工建设', '质量安全管理'],
    features_en: ['Design Optimization', 'Equipment Procurement', 'Construction', 'Quality & Safety']
  },
  {
    section_id: 'operation',
    title: '新能源运营',
    title_en: 'Operations & Maintenance',
    subtitle: '全生命周期资产管理',
    subtitle_en: 'Lifecycle Asset Management',
    description: '提供新能源电站的全生命周期运维服务，保障发电效率和设备安全。',
    description_en: 'Provide O&M services throughout the asset lifecycle.',
    features: ['智能监控运维', '预防性维护', '性能优化提升', '资产增值服务'],
    features_en: ['Smart Monitoring', 'Preventive Maintenance', 'Performance Optimization', 'Value-added Services']
  }
];

async function run() {
  const client = new Client({
    connectionString: 'postgresql://postgres:DXTDPGtJnhsJOqvuvgpdvVwaioDOaNqU@trolley.proxy.rlwy.net:43925/railway'
  });
  
  try {
    await client.connect();
    console.log('Connected to database');
    
    for (const section of businessSections) {
      // Check if exists
      const check = await client.query(
        'SELECT id FROM business_sections WHERE section_id = $1',
        [section.section_id]
      );
      
      if (check.rows.length === 0) {
        await client.query(
          `INSERT INTO business_sections (section_id, title, title_en, subtitle, subtitle_en, description, description_en, features, features_en, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
          [section.section_id, section.title, section.title_en, section.subtitle, 
           section.subtitle_en, section.description, section.description_en,
           section.features, section.features_en]
        );
        console.log(`Created business section: ${section.title}`);
      } else {
        console.log(`Business section already exists: ${section.title}`);
      }
    }
    
    // Initialize company_info if empty
    const infoCheck = await client.query('SELECT id FROM company_info LIMIT 1');
    if (infoCheck.rows.length === 0) {
      await client.query(
        `INSERT INTO company_info (intro, intro_en, updated_at) 
         VALUES ($1, $2, NOW())`,
        ['江能新能源集团有限公司成立于2018年，总部位于中国·天津。公司专注于新能源领域的开发、投资、建设和运营，致力于成为行业领先的全产业链服务商。',
         'JanoEnergy New Energy Group Co., Ltd. was founded in 2018, headquartered in Tianjin, China. The company focuses on the development, investment, construction, and operation of new energy.']
      );
      console.log('Created company info');
    }
    
    console.log('Initialization completed!');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
