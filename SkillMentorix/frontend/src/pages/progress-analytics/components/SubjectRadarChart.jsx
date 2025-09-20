import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

const SubjectRadarChart = ({ data, title = "Subject Competency" }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-educational-lg">
          <p className="text-sm font-medium text-text-primary mb-1">{label}</p>
          <p className="text-sm text-text-secondary">
            <span className="inline-block w-3 h-3 rounded-full mr-2 bg-primary" />
            Competency: {payload?.[0]?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-educational">
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }}
            />
            <Radar
              name="Competency"
              dataKey="value"
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {Math.round(data?.reduce((acc, item) => acc + item?.value, 0) / data?.length)}%
          </p>
          <p className="text-sm text-text-secondary">Average Score</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">
            {data?.filter(item => item?.value >= 80)?.length}
          </p>
          <p className="text-sm text-text-secondary">Strong Subjects</p>
        </div>
      </div>
    </div>
  );
};

export default SubjectRadarChart;