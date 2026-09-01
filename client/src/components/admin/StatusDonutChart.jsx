import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatStatus } from '../../utils/formatters';

const STATUS_HEX_COLORS = {
  pending: '#f59e0b',
  reviewed: '#3b82f6',
  assigned: '#a855f7',
  in_progress: '#6366f1',
  resolved: '#10b981',
  duplicate: '#f43f5e',
};

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-xl shadow-xl border border-slate-800 text-xs space-y-0.5">
        <p className="font-bold text-slate-100">{data.formattedStatus}</p>
        <p className="text-slate-300">
          Count: <span className="font-bold text-white">{data.count}</span> ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
}

export default function StatusDonutChart({ data = [] }) {
  const totalCount = data.reduce((acc, curr) => acc + curr.count, 0) || 1;

  const chartData = data.map((item) => ({
    ...item,
    formattedStatus: formatStatus(item.status),
    percentage: Math.round((item.count / totalCount) * 100),
    color: STATUS_HEX_COLORS[item.status] || '#94a3b8',
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Complaints by Status
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Resolution pipeline and triage stages
          </p>
        </div>
        <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
          {totalCount} Total
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 pt-1">
        {/* Chart View */}
        <div className="sm:col-span-6 h-56 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="formattedStatus"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Info inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-extrabold text-slate-900 leading-none">
              {totalCount}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
              Complaints
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="sm:col-span-6 space-y-2 text-xs">
          {chartData.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-slate-700">{item.formattedStatus}</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <span className="text-slate-900">{item.count}</span>
                <span className="text-slate-400 text-[11px] w-8 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
