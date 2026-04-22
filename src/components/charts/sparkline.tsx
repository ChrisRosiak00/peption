"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type SparklineProps = {
  data: { d: string; v: number }[];
  tone?: "brand" | "mint" | "blush" | "amber";
  height?: number;
  showAxis?: boolean;
};

const tones: Record<NonNullable<SparklineProps["tone"]>, { stroke: string; fillFrom: string; fillTo: string }> = {
  brand: { stroke: "#8b5cf6", fillFrom: "#a78bfa", fillTo: "#a78bfa00" },
  mint: { stroke: "#10b981", fillFrom: "#6ee7b7", fillTo: "#6ee7b700" },
  blush: { stroke: "#ec4899", fillFrom: "#f9a8d4", fillTo: "#f9a8d400" },
  amber: { stroke: "#f59e0b", fillFrom: "#fcd34d", fillTo: "#fcd34d00" },
};

export function Sparkline({ data, tone = "brand", height = 100, showAxis = false }: SparklineProps) {
  const t = tones[tone];
  const gradId = `spark-${tone}`;
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={t.fillFrom} stopOpacity={0.6} />
              <stop offset="100%" stopColor={t.fillTo} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showAxis && (
            <>
              <XAxis
                dataKey="d"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9593a9", fontSize: 11 }}
              />
              <YAxis
                hide
                domain={["auto", "auto"]}
              />
            </>
          )}
          <Tooltip
            cursor={{ stroke: "#ddd6fe", strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #ece9f3",
              boxShadow: "0 10px 30px -10px rgba(76,29,149,0.15)",
              fontSize: 12,
            }}
            labelStyle={{ color: "#56556a" }}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke={t.stroke}
            strokeWidth={2.5}
            fill={`url(#${gradId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
