import { useState } from 'react'
import { motion } from 'framer-motion'
import PieChart from '../charts/PieChart'

interface EnergyMixChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
}

const EnergyMixChart: React.FC<EnergyMixChartProps> = ({ data }) => {
  const [showRenewableOnly, setShowRenewableOnly] = useState(false)
  
  // Liste der erneuerbaren Energiequellen
  const renewableSources = ['Wind', 'Solar', 'Biomasse', 'Wasserkraft']
  
  // Daten für die Anzeige filtern und gruppieren
  const filteredData = showRenewableOnly
    ? data.filter(item => renewableSources.includes(item.name))
    : data
  
  // Berechne den Gesamtanteil erneuerbarer Energien
  const renewablePercentage = data
    .filter(item => renewableSources.includes(item.name))
    .reduce((sum, item) => sum + item.value, 0)
  
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="text-lg font-medium">
          {showRenewableOnly ? 'Erneuerbare Energien' : 'Gesamtmix'}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Nur erneuerbare Energien</span>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={showRenewableOnly}
              onChange={() => setShowRenewableOnly(!showRenewableOnly)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>
      
      <motion.div
        key={showRenewableOnly ? 'renewable' : 'all'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PieChart 
          data={filteredData}
          valueUnit="%"
          innerRadius={70}
          outerRadius={100}
        />
      </motion.div>
      
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Anteil erneuerbarer Energien:</span>
          <span className="text-lg font-bold text-green-600 dark:text-green-400">{renewablePercentage.toFixed(1)}%</span>
        </div>
        
        <div className="mt-2 w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-green-500" 
            initial={{ width: 0 }}
            animate={{ width: `${renewablePercentage}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  )
}

export default EnergyMixChart 