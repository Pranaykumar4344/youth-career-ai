import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

interface VisualMatchScoreProps {
  score: number;
  title: string;
  size?: 'sm' | 'md' | 'lg';
}

const VisualMatchScore = ({ score, title, size = 'md' }: VisualMatchScoreProps) => {
  const getColor = (score: number) => {
    if (score >= 0.8) return '#10b981'; // success
    if (score >= 0.6) return '#f59e0b'; // warning
    return '#ef4444'; // error
  };

  const percentage = Math.round(score * 100);
  const data = [
    { name: 'Match', value: percentage, fill: getColor(score) },
    { name: 'Gap', value: 100 - percentage, fill: '#e5e7eb' }
  ];

  const sizes = {
    sm: { width: 80, height: 80, innerRadius: 25, outerRadius: 35 },
    md: { width: 120, height: 120, innerRadius: 35, outerRadius: 50 },
    lg: { width: 160, height: 160, innerRadius: 50, outerRadius: 70 }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <PieChart width={currentSize.width} height={currentSize.height}>
          <Pie
            data={data}
            cx={currentSize.width / 2}
            cy={currentSize.height / 2}
            innerRadius={currentSize.innerRadius}
            outerRadius={currentSize.outerRadius}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold text-foreground ${size === 'lg' ? 'text-xl' : size === 'md' ? 'text-lg' : 'text-sm'}`}>
            {percentage}%
          </span>
        </div>
      </div>
      <span className={`text-center font-medium ${size === 'lg' ? 'text-base' : 'text-sm'} text-muted-foreground mt-2`}>
        {title}
      </span>
    </div>
  );
};

export default VisualMatchScore;