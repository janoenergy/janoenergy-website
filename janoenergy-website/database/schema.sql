-- 江能集团网站数据库结构
-- PostgreSQL

-- 用户表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'employee', -- admin, manager, employee
    department VARCHAR(50),
    avatar_url VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 项目表
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    title_en VARCHAR(200),
    category VARCHAR(20) NOT NULL, -- wind, solar, storage
    location VARCHAR(100) NOT NULL,
    location_en VARCHAR(100),
    capacity VARCHAR(50) NOT NULL,
    description TEXT,
    description_en TEXT,
    image_url VARCHAR(255),
    status VARCHAR(20) DEFAULT 'planning', -- completed, in-progress, planning
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 新闻表
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    title_en VARCHAR(200),
    summary TEXT,
    summary_en TEXT,
    content TEXT NOT NULL,
    content_en TEXT,
    image_url VARCHAR(255),
    category VARCHAR(20) DEFAULT 'company', -- company, industry, policy
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 审批流程表
CREATE TABLE workflows (
    id SERIAL PRIMARY KEY,
    workflow_no VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(20) NOT NULL, -- expense, payment, contract
    title VARCHAR(200) NOT NULL,
    applicant_id INTEGER REFERENCES users(id),
    amount DECIMAL(15, 2),
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    current_step INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 审批步骤表
CREATE TABLE workflow_steps (
    id SERIAL PRIMARY KEY,
    workflow_id INTEGER REFERENCES workflows(id) ON DELETE CASCADE,
    step_no INTEGER NOT NULL,
    approver_id INTEGER REFERENCES users(id),
    action VARCHAR(20), -- approve, reject
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入测试数据
INSERT INTO users (username, email, password_hash, name, role, department) VALUES
('admin', 'admin@janoenergy.com', '$2b$10$...', '管理员', 'admin', '管理层'),
('zhangsan', 'zhangsan@janoenergy.com', '$2b$10$...', '张三', 'employee', '业务部'),
('lisi', 'lisi@janoenergy.com', '$2b$10$...', '李四', 'manager', '业务部');

INSERT INTO projects (title, title_en, category, location, location_en, capacity, description, description_en, status) VALUES
('西龙虎峪60MW风电项目', 'Xilonghu 60MW Wind Farm', 'wind', '天津市蓟州区', 'Jizhou District, Tianjin', '60MW', 
'项目位于天津市蓟州区西龙虎峪镇...', 'Located in Xilonghu Town...', 'completed');
