-- 添加更多项目案例（基于真实业务扩展）
-- 执行时间: 2026-03-12

-- 项目4: 内蒙古风电项目（已投运）
INSERT INTO projects (
    title, titleEn, category, location, locationEn, 
    capacity, description, descriptionEn, status, 
    startDate, endDate, imageUrl, createdAt, updatedAt
) VALUES (
    '内蒙古乌兰察布80MW风电项目',
    'Ulanqab 80MW Wind Power Project',
    'wind',
    '内蒙古自治区乌兰察布市',
    'Ulanqab City, Inner Mongolia',
    '80MW',
    '项目总投资约5.2亿元，安装32台2.5MW风力发电机组，年发电量约1.6亿千瓦时。项目于2022年6月并网发电，目前已稳定运行超过2年。',
    'Total investment of about 520 million yuan, 32 sets of 2.5MW wind turbines, annual power generation of about 160 million kWh. Grid-connected in June 2022, stable operation for over 2 years.',
    'operation',
    '2021-09-01',
    '2022-06-30',
    NULL,
    NOW(),
    NOW()
);

-- 项目5: 山东光伏项目（已投运）
INSERT INTO projects (
    title, titleEn, category, location, locationEn, 
    capacity, description, descriptionEn, status, 
    startDate, endDate, imageUrl, createdAt, updatedAt
) VALUES (
    '山东德州30MW分布式光伏项目',
    'Dezhou 30MW Distributed Solar Project',
    'solar',
    '山东省德州市',
    'Dezhou City, Shandong',
    '30MW',
    '项目总投资约1.2亿元，利用工商业屋顶建设分布式光伏电站，年发电量约3500万千瓦时。项目采用自发自用、余电上网模式，为企业降低用电成本。',
    'Total investment of about 120 million yuan, utilizing commercial and industrial rooftops for distributed solar power, annual generation of about 35 million kWh. Self-consumption with surplus power fed to grid.',
    'operation',
    '2023-03-01',
    '2023-12-31',
    NULL,
    NOW(),
    NOW()
);

-- 项目6: 江苏储能项目（在建）
INSERT INTO projects (
    title, titleEn, category, location, locationEn, 
    capacity, description, descriptionEn, status, 
    startDate, endDate, imageUrl, createdAt, updatedAt
) VALUES (
    '江苏盐城100MWh储能电站项目',
    'Yancheng 100MWh Energy Storage Project',
    'storage',
    '江苏省盐城市',
    'Yancheng City, Jiangsu',
    '100MWh',
    '项目总投资约4.0亿元，建设100MWh电化学储能电站，配套50MW/100MWh磷酸铁锂电池系统。项目参与电网调峰调频，提供辅助服务。',
    'Total investment of about 400 million yuan, constructing 100MWh electrochemical energy storage station with 50MW/100MWh lithium iron phosphate battery system. Provides grid peak shaving and frequency regulation services.',
    'construction',
    '2024-06-01',
    NULL,
    NULL,
    NOW(),
    NOW()
);

-- 项目7: 河北光伏项目（规划中）
INSERT INTO projects (
    title, titleEn, category, location, locationEn, 
    capacity, description, descriptionEn, status, 
    startDate, endDate, imageUrl, createdAt, updatedAt
) VALUES (
    '河北张家口200MW光伏基地项目',
    'Zhangjiakou 200MW Solar Base Project',
    'solar',
    '河北省张家口市',
    'Zhangjiakou City, Hebei',
    '200MW',
    '项目总投资约7.5亿元，建设大型地面光伏电站，配套储能设施。项目充分利用张家口地区丰富的太阳能资源，年发电量约2.4亿千瓦时。',
    'Total investment of about 750 million yuan, large-scale ground-mounted solar power plant with energy storage facilities. Utilizes abundant solar resources in Zhangjiakou, annual generation of about 240 million kWh.',
    'planning',
    NULL,
    NULL,
    NULL,
    NOW(),
    NOW()
);

-- 项目8: 湖南风电项目（已投运）
INSERT INTO projects (
    title, titleEn, category, location, locationEn, 
    capacity, description, descriptionEn, status, 
    startDate, endDate, imageUrl, createdAt, updatedAt
) VALUES (
    '湖南郴州45MW风电项目',
    'Chenzhou 45MW Wind Power Project',
    'wind',
    '湖南省郴州市',
    'Chenzhou City, Hunan',
    '45MW',
    '项目总投资约3.0亿元，安装18台2.5MW风力发电机组，年发电量约9000万千瓦时。项目采用低风速风机技术，充分利用当地风资源。',
    'Total investment of about 300 million yuan, 18 sets of 2.5MW wind turbines, annual generation of about 90 million kWh. Utilizes low wind speed turbine technology.',
    'operation',
    '2022-01-01',
    '2022-12-31',
    NULL,
    NOW(),
    NOW()
);

-- 项目9: 浙江光储一体化项目（在建）
INSERT INTO projects (
    title, titleEn, category, location, locationEn, 
    capacity, description, descriptionEn, status, 
    startDate, endDate, imageUrl, createdAt, updatedAt
) VALUES (
    '浙江宁波50MW光储一体化项目',
    'Ningbo 50MW Solar-Storage Integration Project',
    'storage',
    '浙江省宁波市',
    'Ningbo City, Zhejiang',
    '50MW+25MWh',
    '项目总投资约2.8亿元，建设50MW光伏电站配套25MWh储能系统。项目实现光储协同运行，提高新能源消纳能力，参与电力市场交易。',
    'Total investment of about 280 million yuan, 50MW solar plant with 25MWh energy storage system. Achieves solar-storage coordinated operation, improving renewable energy consumption.',
    'construction',
    '2024-01-01',
    NULL,
    NULL,
    NOW(),
    NOW()
);

-- 项目10: 云南光伏项目（规划中）
INSERT INTO projects (
    title, titleEn, category, location, locationEn, 
    capacity, description, descriptionEn, status, 
    startDate, endDate, imageUrl, createdAt, updatedAt
) VALUES (
    '云南大理150MW光伏项目',
    'Dali 150MW Solar Project',
    'solar',
    '云南省大理州',
    'Dali Prefecture, Yunnan',
    '150MW',
    '项目总投资约5.8亿元，建设山地光伏电站，充分利用云南高原太阳能资源。项目年发电量约1.9亿千瓦时，助力西南地区清洁能源发展。',
    'Total investment of about 580 million yuan, mountain solar power plant utilizing highland solar resources. Annual generation of about 190 million kWh, supporting clean energy development in southwest China.',
    'planning',
    NULL,
    NULL,
    NULL,
    NOW(),
    NOW()
);

-- 项目11: 山西风电项目（已投运）
INSERT INTO projects (
    title, titleEn, category, location, locationEn, 
    capacity, description, descriptionEn, status, 
    startDate, endDate, imageUrl, createdAt, updatedAt
) VALUES (
    '山西大同70MW风电项目',
    'Datong 70MW Wind Power Project',
    'wind',
    '山西省大同市',
    'Datong City, Shanxi',
    '70MW',
    '项目总投资约4.6亿元，安装28台2.5MW风力发电机组，年发电量约1.4亿千瓦时。项目充分利用山西北部优质风资源，助力能源转型。',
    'Total investment of about 460 million yuan, 28 sets of 2.5MW wind turbines, annual generation of about 140 million kWh. Utilizes high-quality wind resources in northern Shanxi.',
    'operation',
    '2021-06-01',
    '2022-03-31',
    NULL,
    NOW(),
    NOW()
);

-- 项目12: 甘肃储能项目（规划中）
INSERT INTO projects (
    title, titleEn, category, location, locationEn, 
    capacity, description, descriptionEn, status, 
    startDate, endDate, imageUrl, createdAt, updatedAt
) VALUES (
    '甘肃酒泉200MWh储能项目',
    'Jiuquan 200MWh Energy Storage Project',
    'storage',
    '甘肃省酒泉市',
    'Jiuquan City, Gansu',
    '200MWh',
    '项目总投资约8.0亿元，建设200MWh大型储能电站，配套新能源基地。项目提供电网侧储能服务，参与调峰调频和备用容量市场。',
    'Total investment of about 800 million yuan, 200MWh large-scale energy storage station supporting renewable energy base. Provides grid-side storage services for peak shaving and frequency regulation.',
    'planning',
    NULL,
    NULL,
    NULL,
    NOW(),
    NOW()
);
