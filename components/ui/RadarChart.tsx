'use client';

import { motion } from 'framer-motion';
import type { DiagnosisRadar } from '@/lib/types/diagnosis';
import { cn } from '@/lib/utils';

const AXES: { key: keyof DiagnosisRadar; label: string }[] = [
  { key: 'localGeo', label: 'Local GEO' },
  { key: 'aiVisibility', label: 'AI表示' },
  { key: 'faq', label: 'FAQ' },
  { key: 'googleMap', label: 'GMap' },
  { key: 'recommendation', label: '推薦' },
  { key: 'reviews', label: '口コミ' },
  { key: 'aiCitation', label: 'AI引用' },
];

interface RadarChartProps {
  data: DiagnosisRadar;
  className?: string;
  size?: number;
}

function polarPoint(
  index: number,
  total: number,
  value: number,
  cx: number,
  cy: number,
  maxR: number,
): [number, number] {
  const angle = -Math.PI / 2 + (index * (Math.PI * 2)) / total;
  const r = (value / 100) * maxR;
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

function polygonPoints(
  values: number[],
  cx: number,
  cy: number,
  maxR: number,
): string {
  return values
    .map((value, index) => {
      const [x, y] = polarPoint(index, values.length, value, cx, cy, maxR);
      return `${x},${y}`;
    })
    .join(' ');
}

export function RadarChart({ data, className, size = 200 }: RadarChartProps) {
  const cx = 100;
  const cy = 100;
  const maxR = 72;
  const values = AXES.map((axis) => data[axis.key] ?? 0);
  const dataPoints = polygonPoints(values, cx, cy, maxR);

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={cn('overflow-visible', className)}
      role="img"
      aria-label="診断レーダーチャート"
    >
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <polygon
          key={scale}
          points={polygonPoints(
            AXES.map(() => 100 * scale),
            cx,
            cy,
            maxR,
          )}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={1}
        />
      ))}

      {AXES.map((_, index) => {
        const [x, y] = polarPoint(index, AXES.length, 100, cx, cy, maxR);
        return (
          <line
            key={index}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
          />
        );
      })}

      <motion.polygon
        points={dataPoints}
        fill="rgba(59,114,255,0.28)"
        stroke="#3b72ff"
        strokeWidth={2}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {AXES.map((axis, index) => {
        const [x, y] = polarPoint(index, AXES.length, 118, cx, cy, maxR);
        return (
          <text
            key={axis.key}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white/60 text-[9px] font-medium"
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}
