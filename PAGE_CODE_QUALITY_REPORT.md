# 网站页面代码质量详细检查报告

**检查日期**: 2026-03-19  
**检查范围**: /my-app/src/app 下所有页面  
**总文件数**: 30 个页面文件  
**总代码行数**: 5,536 行

---

## 📊 各页面代码质量评分

| 页面 | 行数 | 评分 | 主要问题 |
|------|------|------|----------|
| **admin/projects/page.tsx** | 639 | ⚠️ D (4/10) | 超大组件、any类型、内联组件 |
| **admin/company/page.tsx** | 610 | ⚠️ D (4/10) | 超大组件、any类型、重复代码 |
| **[lang]/esg/ESGContent.tsx** | 521 | ⚠️ C (5/10) | 硬编码数据、动态类名 |
| **admin/news/page.tsx** | 468 | ⚠️ C (5/10) | 内联组件、any类型 |
| **[lang]/about/AboutContent.tsx** | 461 | ⚠️ C (5/10) | 重复类型定义、硬编码URL |
| **[lang]/projects/ProjectsContent.tsx** | 365 | 🟡 B (6/10) | 行数偏多、可拆分 |
| **admin/dashboard/page.tsx** | 309 | 🟡 B (6/10) | any类型使用 |
| **admin/settings/page.tsx** | 295 | 🟡 B (6/10) | 相对较好 |
| **[lang]/team/page.tsx** | 274 | 🟡 B+ (7/10) | 相对较好 |
| **[lang]/contact/ContactContent.tsx** | 272 | 🟡 B+ (7/10) | 相对较好 |
| **[lang]/HomeContent.tsx** | 587 | ⚠️ C (5/10) | 超大组件、any类型 |
| **其他小页面** | <100 | ✅ A (8-9/10) | 良好 |

---

## 🔴 严重问题汇总

### 1. 超大组件 (5个文件超过400行)

| 文件 | 行数 | 问题描述 |
|------|------|----------|
| `admin/projects/page.tsx` | 639 | 包含完整CRUD、表单、表格、弹窗 |
| `admin/company/page.tsx` | 610 | 6个Tab内容全部在一个文件 |
| `[lang]/HomeContent.tsx` | 587 | Hero+业务板块+项目展示+CTA |
| `[lang]/esg/ESGContent.tsx` | 521 | 多个独立区块混在一起 |
| `[lang]/about/AboutContent.tsx` | 461 | 简介+历程+价值观+团队+证书 |

**影响**: 可维护性差、测试困难、代码复用率低

### 2. any 类型滥用 (40+ 处)

**主要分布**:
- `admin/projects/page.tsx`: 7处 (Button, Modal, Input, Select等)
- `admin/news/page.tsx`: 6处
- `admin/company/page.tsx`: 10+处
- `admin/dashboard/page.tsx`: 4处
- `lib/form-components.tsx`: 5处
- `lib/export.ts`: 4处

**示例**:
```typescript
// ❌ 不好的做法
function Button({ children, onClick, variant = 'primary' }: any) {

// ✅ 好的做法
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
}
function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
```

### 3. 重复类型定义 (Project 类型定义在6处)

| 位置 | 定义 |
|------|------|
| `admin/projects/page.tsx` | interface Project {...} |
| `admin/projects/enhanced-page.tsx` | interface Project {...} |
| `[lang]/projects/ProjectsContent.tsx` | interface Project {...} |
| `[lang]/HomeContent.tsx` | interface ApiProject {...} |
| `[lang]/about/AboutContent.tsx` | interface Project {...} |
| `types/index.ts` | (应该统一在这里) |

### 4. 硬编码图片URL (81处)

```typescript
// 散落在各处的Unsplash URL
const projectImages: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&auto=format&fit=crop',
  2: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&auto=format&fit=crop',
  // ... 81处
};
```

### 5. 内联组件 (Inline Components)

在页面文件中直接定义组件，导致：
- 每次渲染都重新创建
- 无法复用
- 类型定义混乱

**示例**:
```typescript
// admin/projects/page.tsx 中定义了:
function Button({...}: any) {...}
function Modal({...}: any) {...}
function Input({...}: any) {...}
function Select({...}: any) {...}
function TextArea({...}: any) {...}
function ImageUpload({...}: any) {...}
```

---

## 🟡 中等问题

### 6. 硬编码数据

```typescript
// ESGContent.tsx
const provinces = [
  { name: '天津', x: 75, y: 35, projects: 1 },
  // ... 硬编码12个省份
];

const esgData = {
  carbonTarget: { peak: { year: 2030, progress: 65 } },
  // ... 硬编码所有ESG数据
};
```

### 7. 动态类名 (Tailwind 限制)

```typescript
// ❌ 可能导致样式不生效
text-${color}-600
bg-${color}-500

// ✅ 应该使用完整类名映射
const colorClasses = {
  emerald: { text: 'text-emerald-600', bg: 'bg-emerald-500' },
  blue: { text: 'text-blue-600', bg: 'bg-blue-500' },
};
```

### 8. API 调用分散

每个页面都有自己的 fetch 逻辑，没有统一封装：
```typescript
// 页面1
const res = await fetch(API_ENDPOINTS.projects);

// 页面2
const response = await fetch(`${API_BASE_URL}/api/projects`);

// 页面3
fetch('https://api.janoenergy.com/api/projects')
```

---

## ✅ 良好实践

### 做得好的地方

1. **目录结构清晰** - app/[lang]/ 路由组织合理
2. **组件拆分** - 小页面拆分了 Content 组件
3. **类型使用** - 大部分地方使用了具体类型
4. **SEO 配置** - generateMetadata 使用正确
5. **动画优化** - viewport={{ once: true }} 防止重复动画

---

## 📋 重构优先级

### 🔴 立即处理 (本周)

1. **提取公共表单组件**
   - 将 Button, Input, Select, Modal 移到 `components/ui/`
   - 添加正确的 TypeScript 类型

2. **统一类型定义**
   - 在 `types/index.ts` 统一定义 Project, News, User 等类型
   - 所有页面引用统一类型

3. **拆分超大组件**
   - admin/projects/page.tsx → 拆分为 Table, Form, Filter 组件
   - admin/company/page.tsx → 每个 Tab 独立组件

### 🟡 本周处理

4. **集中管理图片URL**
   - 创建 `lib/images.ts`
   - 所有图片引用统一配置

5. **封装 API 服务**
   - 创建 `services/api.ts`
   - 统一错误处理、超时、重试

### 🟢 后续优化

6. **动态导入大组件**
7. **添加单元测试**
8. **配置 ESLint 规则**

---

## 🎯 重构后预期

| 指标 | 当前 | 目标 |
|------|------|------|
| 平均评分 | 5.95/10 | 8.5/10 |
| any 类型 | 40+ 处 | 0 处 |
| 超大组件 | 5 个 | 0 个 |
| 重复类型 | 6 处 | 1 处 |
| 硬编码URL | 81 处 | 0 处 |

---

*报告生成时间: 2026-03-19*  
*下一步: 开始第一阶段重构 - 提取公共组件*
