import { motion } from 'framer-motion'
import BarChart from '../charts/BarChart'

interface ComparisonChartProps {
  data: Array<{
    entityName: string
    consumption: number
    unit: 'kWh' | 'MWh' | 'GWh'
    type: 'household' | 'city' | 'industry' | 'country'
    convertedValue: number
  }>
  unit: 'kWh' | 'MWh' | 'GWh'
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data, unit }) => {
  // Daten für die Anzeige formatieren
  const formattedData = data.map(item => ({
    name: item.entityName,
    value: item.convertedValue,
    type: item.type
  }))
  
  // Farbzuordnung basierend auf dem Typ
  const getColorByType = (type: string) => {
    const colors = {
      household: '#3b82f6', // blue
      city: '#10b981',      // green
      industry: '#f59e0b',  // yellow
      country: '#ef4444'    // red
    }
    return colors[type as keyof typeof colors] || '#6b7280'
  }
  
  // Daten nach Wert sortieren
  const sortedData = [...formattedData].sort((a, b) => a.value - b.value)
  
  return (
    <div>
      {/* Balkendiagramm */}
      <div className="h-64">
        <BarChart 
          data={sortedData}
          xKey="name"
          yKey="value"
          label={`Energieverbrauch (${unit})`}
          color={sortedData.length > 0 ? getColorByType(sortedData[0].type) : '#3b82f6'}
        />
      </div>
      
      {/* Legende */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="flex items-center text-sm">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span>Haushalt</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>Stadt</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span>Industrie</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span>Land</span>
        </div>
      </div>
      
      {/* Faktenbox */}
      <motion.div 
        className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <p className="font-medium mb-1">Wussten Sie?</p>
        <p>Der durchschnittliche deutsche Haushalt (mit 2-3 Personen) verbraucht jährlich etwa 3.500 kWh Strom. Ein ganzes Land wie Deutschland kann bis zu 500 TWh (500.000.000.000 kWh) im Jahr verbrauchen.</p>
      </motion.div>
    </div>
  )
}

export default ComparisonChart 