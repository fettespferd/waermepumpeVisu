import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'

interface LineData {
  name: string
  dataKey: string
  color: string
  strokeWidth?: number
}

interface LineChartProps {
  data: any[]
  xAxisKey: string
  lines: LineData[]
  title?: string
  xAxisLabel?: string
  yAxisLabel?: string
  showGrid?: boolean
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  xAxisKey, 
  lines,
  title,
  xAxisLabel,
  yAxisLabel,
  showGrid = true
}) => {
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
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.3} />}
            
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fill: '#6b7280' }}
              label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottomRight', offset: -5 } : undefined}
            />
            
            <YAxis 
              tick={{ fill: '#6b7280' }}
              label={yAxisLabel ? 
                { value: yAxisLabel, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } } : 
                undefined
              }
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '4px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            
            <Legend />
            
            {lines.map((line, index) => (
              <Line 
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                strokeWidth={line.strokeWidth || 2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1000 + index * 300}
                animationBegin={index * 150}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default LineChart 