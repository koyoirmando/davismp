import { BarChart as RechartsBarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dailyAbsenceData } from '../data/universityData';

export default function BarChartComponent({ isDark = false }: { isDark?: boolean }) {
  const axisColor = isDark ? '#aaaaaa' : '#000000';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={dailyAbsenceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="none" stroke={axisColor} vertical={false} opacity={isDark ? 0.15 : 0.1} />
        <XAxis 
          dataKey="day" 
          stroke={axisColor} 
          axisLine={{ strokeWidth: 3 }}
          tickLine={{ strokeWidth: 2 }}
          tick={{ fontSize: 11, fontWeight: 900, fill: axisColor }} 
          dy={10} 
        />
        <YAxis 
          stroke={axisColor} 
          axisLine={{ strokeWidth: 3 }}
          tickLine={{ strokeWidth: 2 }}
          tick={{ fontSize: 11, fontWeight: 900, fill: axisColor }} 
        />
        <Tooltip 
          cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} 
          contentStyle={{ 
            backgroundColor: isDark ? '#1a1a1a' : '#ffffff', 
            border: `3px solid ${isDark ? '#555' : '#000000'}`, 
            boxShadow: `4px 4px 0px ${isDark ? '#333' : '#000000'}`,
            borderRadius: '0px',
            fontSize: '13px',
            fontWeight: 900,
            color: isDark ? '#f0f0f0' : '#000000'
          }} 
        />
        <Bar dataKey="absences" radius={[0, 0, 0, 0]} maxBarSize={45} stroke={isDark ? '#555' : '#000000'} strokeWidth={3}>
          {
            dailyAbsenceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.day === 'Jum' || entry.day === 'Sen' ? '#db2017' : '#5f3775'} />
            ))
          }
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
