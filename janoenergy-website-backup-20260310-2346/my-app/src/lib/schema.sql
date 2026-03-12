-- 创建项目表
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  category_name VARCHAR(50),
  location VARCHAR(255),
  capacity VARCHAR(100),
  status VARCHAR(50),
  description TEXT,
  completion_date VARCHAR(20),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建新闻表
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  content TEXT,
  category VARCHAR(50),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建用户表（后台管理）
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入示例项目数据
INSERT INTO projects (title, category, category_name, location, capacity, status, description, completion_date) VALUES
('西龙虎峪60MW风电项目', 'wind', '风电', '天津市蓟州区', '60MW', 'completed', '安装24台2.5MW风力发电机组，年发电量约1.4亿千瓦时', '2024-06'),
('广东茂名50MW光伏项目', 'solar', '光伏', '广东省茂名市', '50MW', 'completed', '渔光互补光伏发电项目，年发电量约5500万千瓦时', '2023-12'),
('四川甘孜100MW光伏储能项目', 'storage', '储能', '四川省甘孜州', '100MW光伏+20MW/40MWh储能', 'in-progress', '光伏+储能一体化项目，配置磷酸铁锂电池储能系统', '2025-12');

-- 插入示例新闻数据
INSERT INTO news (title, summary, content, category, published_at) VALUES
('江能集团中标河北200MW风电项目', '成功中标河北省张家口市200MW风电开发项目', '详细内容...', 'company', '2025-03-01'),
('国家能源局发布2025年新能源发展政策', '明确2025年风电光伏新增装机目标', '详细内容...', 'industry', '2025-02-28');
