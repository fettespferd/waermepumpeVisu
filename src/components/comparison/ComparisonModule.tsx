import { motion } from 'framer-motion'
import { useState } from 'react'
import { energyComparisonData, germanEnergyMix } from '../../data/mockData'
import ComparisonChart from './ComparisonChart'
import EnergyMixChart from './EnergyMixChart'
import ScaleVisualization from './ScaleVisualization'

const ComparisonModule = () => {
  const [selectedUnit, setSelectedUnit] = useState<'kWh' | 'MWh' | 'GWh'>('kWh')
  
  // Umrechnung der Verbrauchsdaten basierend auf der ausgewählten Einheit
  const convertedData = energyComparisonData.map(item => {
    let value = item.consumption
    
    // Umrechnung in die ausgewählte Einheit
    if (item.unit === 'GWh' && selectedUnit === 'kWh') {
      value *= 1000000
    } else if (item.unit === 'GWh' && selectedUnit === 'MWh') {
      value *= 1000
    } else if (item.unit === 'MWh' && selectedUnit === 'kWh') {
      value *= 1000
    } else if (item.unit === 'kWh' && selectedUnit === 'MWh') {
      value /= 1000
    } else if (item.unit === 'kWh' && selectedUnit === 'GWh') {
      value /= 1000000
    } else if (item.unit === 'MWh' && selectedUnit === 'GWh') {
      value /= 1000
    }
    
    return {
      ...item,
      convertedValue: value
    }
  })
  
  // Daten für das Kreisdiagramm formatieren
  const energyMixData = germanEnergyMix.map(item => ({
    name: item.source,
    value: item.percentage,
    color: item.color
  }))
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-3 sm:space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2 md:gap-0">
              <h3 className="text-md md:text-lg font-semibold">Energieverbrauch im Vergleich</h3>
              <div className="inline-flex rounded-md shadow-sm">
                {(['kWh', 'MWh', 'GWh'] as const).map(unit => (
                  <button
                    key={unit}
                    type="button"
                    className={`px-3 py-1 text-xs md:text-sm font-medium ${
                      selectedUnit === unit
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                    } ${unit === 'kWh' ? 'rounded-l-lg' : ''} ${unit === 'GWh' ? 'rounded-r-lg' : ''}`}
                    onClick={() => setSelectedUnit(unit)}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            <ComparisonChart data={convertedData} unit={selectedUnit} />
          </div>
          <div className="mt-3 md:mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 md:p-6">
            <h3 className="text-md md:text-lg font-semibold mb-4">Größenordnungen verstehen</h3>
            <ScaleVisualization />
          </div>
        </div>
        <div className="mt-3 md:mt-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 md:p-6">
            <h3 className="text-md md:text-lg font-semibold mb-4">Deutscher Energiemix 2022</h3>
            <EnergyMixChart data={energyMixData} />
            <div className="mt-6 space-y-2 text-xs md:text-sm">
              <p className="font-medium">Wussten Sie?</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
                <li>Deutschland will bis 2045 klimaneutral werden</li>
                <li>Der Anteil erneuerbarer Energien ist seit 2010 um mehr als 20% gestiegen</li>
                <li>An besonders sonnigen und windigen Tagen kann Deutschland bereits mehr als 60% seines Stroms aus erneuerbaren Quellen erzeugen</li>
                <li>Bis 2030 sollen 80% des Stroms aus erneuerbaren Energien stammen</li>
              </ul>
            </div>
          </div>
          <div className="mt-3 md:mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 md:p-6">
            <h3 className="text-md md:text-lg font-semibold mb-4">Energieeffizienz in Deutschland</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 md:p-4 rounded-lg">
                <div className="font-medium mb-1">Energieintensität der Wirtschaft</div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">2010</span>
                  <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">100%</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">2022</span>
                  <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">76%</span>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 md:p-4 rounded-lg">
                <div className="font-medium mb-1">CO₂-Emissionen (ggü. 1990)</div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">1990</span>
                  <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">100%</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">2022</span>
                  <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '63%' }}></div>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">63%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ComparisonModule 