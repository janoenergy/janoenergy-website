'use client';

import { motion } from 'framer-motion';
import { Lang } from '@/lib/translations';

const provinces = [
  { name: '天津', nameEn: 'Tianjin', x: 75, y: 35, projects: 1 },
  { name: '河北', nameEn: 'Hebei', x: 68, y: 28, projects: 2 },
  { name: '山西', nameEn: 'Shanxi', x: 58, y: 32, projects: 1 },
  { name: '内蒙古', nameEn: 'Inner Mongolia', x: 65, y: 22, projects: 1 },
  { name: '山东', nameEn: 'Shandong', x: 70, y: 40, projects: 1 },
  { name: '江苏', nameEn: 'Jiangsu', x: 78, y: 48, projects: 1 },
  { name: '浙江', nameEn: 'Zhejiang', x: 80, y: 55, projects: 1 },
  { name: '湖南', nameEn: 'Hunan', x: 62, y: 65, projects: 1 },
  { name: '云南', nameEn: 'Yunnan', x: 45, y: 72, projects: 1 },
  { name: '甘肃', nameEn: 'Gansu', x: 35, y: 38, projects: 1 },
  { name: '四川', nameEn: 'Sichuan', x: 42, y: 58, projects: 1 },
  { name: '广东', nameEn: 'Guangdong', x: 65, y: 78, projects: 1 },
];

interface ChinaMapProps {
  lang: Lang;
}

export function ChinaMap({ lang }: ChinaMapProps) {
  return (
    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl overflow-hidden">
      {/* 简化的中国地图轮廓 */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {/* 地图背景 */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* 中国轮廓示意 */}
        <path
          d="M20,30 Q30,20 50,25 Q70,20 85,35 Q90,50 80,70 Q70,85 50,80 Q30,85 20,70 Q10,50 20,30"
          fill="#d1fae5"
          stroke="#10b981"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* 省份标记点 */}
        {provinces.map((province, index) => (
          <motion.g
            key={province.name}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {/* 脉冲效果 */}
            <motion.circle
              cx={province.x}
              cy={province.y}
              r="3"
              fill="#10b981"
              opacity="0.3"
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* 主标记 */}
            <circle
              cx={province.x}
              cy={province.y}
              r="2"
              fill="#10b981"
              stroke="white"
              strokeWidth="0.5"
            />
            {/* 标签 */}
            <text
              x={province.x}
              y={province.y - 3}
              textAnchor="middle"
              className="text-[2px] fill-gray-700 font-medium"
            >
              {lang === 'zh' ? province.name : province.nameEn}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* 图例 */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span>{lang === 'zh' ? '运营中项目' : 'Operating Projects'}</span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {lang === 'zh' ? `共 ${provinces.length} 个省份` : `${provinces.length} Provinces`}
        </div>
      </div>
    </div>
  );
}
