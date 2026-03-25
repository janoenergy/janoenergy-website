'use client';

import { motion } from 'framer-motion';
import { Lang } from '@/lib/translations';

interface ProgressBarProps {
  label: string;
  target: string;
  progress: number;
  color?: string;
}

export function ProgressBar({ label, target, progress, color = 'emerald' }: ProgressBarProps) {
  return (
    <div className="bg-card rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{label}</h3>
          <p className="text-sm text-muted-foreground">目标: {target}</p>
        </div>
        <div className={`text-3xl font-bold text-${color}-600`}>{progress}%</div>
      </div>
      <div className="h-4 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full bg-${color}-500 rounded-full`}
        />
      </div>
    </div>
  );
}

interface DataCardProps {
  icon: React.ElementType;
  value: number | string;
  unit?: string;
  label: string;
  color?: string;
  delay?: number;
}

export function DataCard({
  icon: Icon,
  value,
  unit,
  label,
  color = 'emerald',
  delay = 0,
}: DataCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-card rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg"
    >
      <div className={`w-14 h-14 rounded-xl bg-${color}-100 flex items-center justify-center mb-4`}>
        <Icon className={`w-7 h-7 text-${color}-600`} />
      </div>
      <div className="text-3xl font-bold text-foreground mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
        {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </motion.div>
  );
}
