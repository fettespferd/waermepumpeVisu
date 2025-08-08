import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'

interface PieChartProps {
  data: Array<{
    name: string
    value: number
    color?: string
  }>
  title?: string
  valueUnit?: string
  innerRadius?: number
  outerRadius?: number
}

const PieChart: React.FC<PieChartProps> = ({ 
  data, 
  title, 
  valueUnit = '',
  innerRadius = 60,
  outerRadius = 80
}) => {
  // Animationseinstellungen für den Hover-Effekt
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }: any) => {
    const RADIAN = Math.PI / 180
    const radius = 25 + innerRadius + (outerRadius - innerRadius)
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return percent >= 0.05 ? (
      <text
        x={x}
        y={y}
        fill="#888"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs"
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    ) : null
  }

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{title}</h3>
      )}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
              fill="#8884d8"
              dataKey="value"
              animationDuration={1000}
              animationBegin={200}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || `hsl(${index * 45}, 70%, 60%)`} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}${valueUnit}`, '']}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '4px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default PieChart 