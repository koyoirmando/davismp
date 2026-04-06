import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { facultyDistribution } from '../data/universityData';

/* Luxury UNKLAB Colors: Dark Purple, Purple, Red, Yellow */
const PIE_COLORS = ['#3e1b54', '#5f3775', '#db2017', '#fff500'];



export default function PieChartComponent({ isDark = false, large = false }: { isDark?: boolean, large?: boolean }) {
  const legendColor = isDark ? '#cccccc' : '#000000';
  const radius = large ? 180 : 80;
  const labelFontSize = large ? 18 : 13;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={facultyDistribution}
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={radius}
          paddingAngle={0}
          dataKey="value"
          nameKey="faculty"
          stroke={isDark ? '#333' : '#000000'}
          strokeWidth={3}
          labelLine={false}
          label={({ cx, cy, midAngle, innerRadius: ir, outerRadius: or, percent }: any) => {
            const r = ir + (or - ir) * 0.55;
            const x = cx + r * Math.cos(-midAngle * Math.PI / 180);
            const y = cy + r * Math.sin(-midAngle * Math.PI / 180);
            const textColor = percent <= 0.15 ? '#000000' : '#ffffff';
            return (
              <text x={x} y={y} fill={textColor} textAnchor="middle" dominantBaseline="central" fontSize={labelFontSize} fontWeight={900}>
                {`${(percent * 100).toFixed(0)}%`}
              </text>
            );
          }}
        >
          {facultyDistribution.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: any) => [`${value}%`, 'Proporsi']}
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
        <Legend 
          layout="vertical"
          verticalAlign="middle" 
          align="right"
          iconType="square"
          iconSize={large ? 16 : 10}
          formatter={(value) => <span style={{ color: legendColor, fontSize: large ? '15px' : '11px' }}>{value}</span>}
          wrapperStyle={{ fontSize: large ? '15px' : '11px', fontWeight: 900, lineHeight: large ? '2.2' : '1.8' }} 
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
