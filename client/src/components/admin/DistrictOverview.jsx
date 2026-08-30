import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const DISTRICT_COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#06b6d4', '#10b981'];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-xl shadow-xl border border-slate-800 text-xs space-y-0.5">
        <p className="font-bold text-slate-100">{data.district}</p>
        <p className="text-indigo-300">
          Complaints: <span className="font-extrabold text-white">{data.count}</span> ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
}

export default function DistrictOverview({ data = [] }) {
  const total = data.reduce((acc, curr) => acc + curr.count, 0) || 1;

  const chartData = data.map((d, index) => ({
    ...d,
    rank: index + 1,
    percentage: Math.round((d.count / total) * 100),
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            District Footprint Overview
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Geographic hotspot breakdown across Jharkhand
          </p>
        </div>
        <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
          {data.length} Key Districts
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center pt-1">
        {/* Left: Ranked Progress List */}
        <div className="md:col-span-6 space-y-3">
          {chartData.map((item, idx) => (
            <div key={item.district} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      idx === 0
                        ? 'bg-rose-100 text-rose-700 font-extrabold'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.rank}
                  </span>
                  <span className="font-semibold text-slate-800">{item.district}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900">{item.count}</span>
                  <span className="text-[11px] text-slate-400">({item.percentage}%)</span>
                </div>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${item.percentage * 1.8}%`,
                    backgroundColor: DISTRICT_COLORS[idx % DISTRICT_COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right: Horizontal Bar Chart Visualization */}
        <div className="md:col-span-6 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis
                type="category"
                dataKey="district"
                tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} animationDuration={800}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={DISTRICT_COLORS[index % DISTRICT_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
