import { motion } from 'framer-motion'
import PieChart from '../charts/PieChart'

interface RenewableSummaryProps {
  solarTotal: number
  windTotal: number
  combinedTotal: number
}

const RenewableSummary: React.FC<RenewableSummaryProps> = ({ 
  solarTotal, 
  windTotal, 
  combinedTotal 
}) => {
  // Pie-Chart-Daten
  const pieData = [
    { name: 'Solar', value: parseFloat(solarTotal.toFixed(2)), color: '#f59e0b' },
    { name: 'Wind', value: parseFloat(windTotal.toFixed(2)), color: '#3b82f6' }
  ]
  
  // CO2-Einsparungen berechnen (ca. 0,5 kg CO2 pro kWh im Vergleich zu Kohlestrom)
  const co2Savings = combinedTotal * 0.5

  // Haushalt-Vergleich (durchschnittlicher Haushalt: 10 kWh/Tag)
  const householdsServed = Math.floor(combinedTotal / 10)
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
      {/* Hauptkennzahlen */}
      <motion.div
        className="sm:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-md sm:text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Energieproduktion heute</h3>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Solar</p>
            <p className="text-2xl font-bold text-yellow-500">{solarTotal.toFixed(1)} kWh</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
            <p className="text-2xl font-bold text-blue-500">{windTotal.toFixed(1)} kWh</p>
          </div>
          
          <div className="col-span-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Gesamt</p>
            <p className="text-3xl font-bold text-green-500">{combinedTotal.toFixed(1)} kWh</p>
          </div>
        </div>
      </motion.div>
      
      {/* Umwelteinsparungen */}
      <motion.div
        className="sm:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-md sm:text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Umweltauswirkungen</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">CO₂-Einsparung</p>
            <p className="text-2xl font-bold text-green-500">{co2Savings.toFixed(1)} kg</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Haushalte versorgt</p>
            <p className="text-2xl font-bold text-indigo-500">{householdsServed}</p>
          </div>
        </div>
      </motion.div>
      
      {/* Verteilungsgrafik */}
      <motion.div
        className="sm:col-span-4 mt-3 sm:mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <PieChart 
          data={pieData}
          title="Energieverteilung nach Quelle"
          valueUnit=" kWh"
          innerRadius={70}
          outerRadius={90}
        />
      </motion.div>
    </div>
  )
}

export default RenewableSummary 