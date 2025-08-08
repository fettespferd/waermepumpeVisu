import { useState } from 'react'
import { motion } from 'framer-motion'
import LineChart from '../charts/LineChart'

interface ProductionChartProps {
  data: Array<{
    hour: number
    solar: number
    wind: number
    total: number
  }>
}

const ProductionChart: React.FC<ProductionChartProps> = ({ data }) => {
  const [chartType, setChartType] = useState<'separate' | 'combined'>('separate')
  
  // Zeitlabels für die Anzeige formatieren
  const formattedData = data.map(item => ({
    ...item,
    hourLabel: `${item.hour}:00`
  }))
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Energieproduktion über 24 Stunden</h3>
        
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              chartType === 'separate'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            onClick={() => setChartType('separate')}
          >
            Getrennt
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              chartType === 'combined'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            onClick={() => setChartType('combined')}
          >
            Kombiniert
          </button>
        </div>
      </div>
      
      <motion.div
        key={chartType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {chartType === 'separate' ? (
          <LineChart
            data={formattedData}
            xAxisKey="hourLabel"
            lines={[
              { name: 'Solar (kWh)', dataKey: 'solar', color: '#f59e0b' },
              { name: 'Wind (kWh)', dataKey: 'wind', color: '#3b82f6' }
            ]}
            xAxisLabel="Stunde"
            yAxisLabel="kWh"
          />
        ) : (
          <LineChart
            data={formattedData}
            xAxisKey="hourLabel"
            lines={[
              { name: 'Gesamt (kWh)', dataKey: 'total', color: '#10b981', strokeWidth: 3 }
            ]}
            xAxisLabel="Stunde"
            yAxisLabel="kWh"
          />
        )}
      </motion.div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm">
          <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
          <span>Solar: Am effektivsten zwischen 10:00 und 16:00 Uhr</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          <span>Wind: Variiert je nach Wetterbedingungen, oft stärker nachts</span>
        </div>
      </div>
    </div>
  )
}

export default ProductionChart 