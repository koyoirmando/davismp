import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { gpaTrendData } from '../data/universityData';

export default function LineChartComponent({ isStep = true, isDark = false }: { isStep?: boolean, isDark?: boolean }) {
  const axisColor = isDark ? '#aaaaaa' : '#000000';
  const gridOpacity = isDark ? 0.15 : 0.1;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={gpaTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="none" stroke={axisColor} vertical={true} opacity={gridOpacity} />
        <XAxis
          dataKey="semester"
          stroke={axisColor}
          axisLine={{ strokeWidth: 3 }}
          tickLine={{ strokeWidth: 2 }}
          tick={{ fontSize: 11, fontWeight: 900, fill: axisColor }}
          dy={10}
        />
        <YAxis
          domain={[2.0, 4.0]}
          stroke={axisColor}
          axisLine={{ strokeWidth: 3 }}
          tickLine={{ strokeWidth: 2 }}
          tick={{ fontSize: 11, fontWeight: 900, fill: axisColor }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
            border: `3px solid ${isDark ? '#555' : '#000000'}`,
            boxShadow: `4px 4px 0px ${isDark ? '#333' : '#000000'}`,
            borderRadius: '0px',
            fontSize: '13px',
            fontWeight: 900,
            color: isDark ? '#f0f0f0' : '#000000'
          }}
          itemStyle={{ color: '#db2017' }}
        />
        {/* Garis Bahaya IPR: Batas IPK 2.30 (Buku Panduan UNKLAB) */}
        <ReferenceLine
          y={2.30}
          stroke="#db2017"
          strokeWidth={2.5}
          strokeDasharray="8 4"
          label={{
            value: '⚠ BATAS IPR 2.30',
            position: 'insideTopLeft',
            fontSize: 11,
            fontWeight: 900,
            fill: '#db2017',
            offset: 6,
          }}
        />
        <Area
          type={isStep ? "step" : "monotone"}
          dataKey="gpa"
          stroke={isDark ? '#fff500' : '#000000'}
          strokeWidth={4}
          fillOpacity={isDark ? 0.3 : 1}
          fill="#fff500"
          activeDot={{ r: 7, fill: '#db2017', stroke: isDark ? '#fff' : '#000000', strokeWidth: 4 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
