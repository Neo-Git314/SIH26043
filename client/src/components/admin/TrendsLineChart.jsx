import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white px-3.5 py-2 rounded-xl shadow-xl border border-slate-800 text-xs space-y-0.5">
        <p className="font-semibold text-slate-300">{formatDate(data.date)} ({data.date})</p>
        <p className="font-extrabold text-indigo-300 text-sm">
          {data.count} <span className="font-normal text-xs text-white">Submissions</span>
        </p>
      </div>
    );
  }
  return null;
}

export default function TrendsLineChart({ data = [] }) {
  const counts = data.map((d) => d.count);
  const peak = counts.length > 0 ? Math.max(...counts) : 0;
  const total = counts.reduce((a, b) => a + b, 0);
  const avg = counts.length > 0 ? (total / counts.length).toFixed(1) : 0;

  const chartData = data.map((d) => ({
    ...d,
    formattedDate: formatDate(d.date),
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Complaint Submission Trends (Last 30 Days)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Daily citizen problem reporting volume over time
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
            <span className="text-slate-400">Peak: </span>
            <strong className="text-slate-800">{peak}/day</strong>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-lg">
            <span className="text-indigo-400">Daily Avg: </span>
            <strong>{avg}</strong>
          </div>
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="formattedDate"
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#trendGradient)"
              dot={{ r: 3, fill: '#4f46e5', strokeWidth: 1, stroke: '#fff' }}
              activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
