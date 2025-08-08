import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'

interface BarChartProps {
  data: any[]
  xKey: string
  yKey: string
  label: string
  color?: string
  title?: string
}

const BarChart: React.FC<BarChartProps> = ({ data, xKey, yKey, label, color = '#3b82f6', title }) => {
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
          <RechartsBarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.3} />
            <XAxis 
              dataKey={xKey} 
              tick={{ fill: '#6b7280' }} 
              tickFormatter={(value) => value.toString()} 
            />
            <YAxis
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '4px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [`${value} kWh`, label]}
            />
            <Legend />
            <Bar 
              dataKey={yKey} 
              name={label} 
              fill={color} 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default BarChart 