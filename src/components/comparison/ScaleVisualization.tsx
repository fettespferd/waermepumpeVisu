import { useState } from 'react'
import { motion } from 'framer-motion'

const ScaleVisualization = () => {
  const [selectedScale, setSelectedScale] = useState<'kWh' | 'MWh' | 'GWh'>('kWh')
  
  // Beispiel-Items für verschiedene Energieeinheiten
  const scaleExamples = {
    kWh: [
      { name: '1 Stunde Föhn', value: 1.5, color: 'bg-blue-200' },
      { name: '1 Ladezyklus E-Auto', value: 60, color: 'bg-blue-400' },
      { name: 'Kühlschrank (1 Monat)', value: 30, color: 'bg-blue-600' },
      { name: 'Haushalt (1 Monat)', value: 300, color: 'bg-blue-800' }
    ],
    MWh: [
      { name: 'Haushalt (1 Jahr)', value: 3.5, color: 'bg-green-200' },
      { name: 'Kleinbetrieb (1 Monat)', value: 20, color: 'bg-green-400' },
      { name: 'Supermarkt (1 Monat)', value: 80, color: 'bg-green-600' },
      { name: 'Windrad (1 Tag)', value: 240, color: 'bg-green-800' }
    ],
    GWh: [
      { name: 'Großes Rechenzentrum (1 Monat)', value: 1.5, color: 'bg-red-200' },
      { name: 'Kleinstadt (1 Woche)', value: 7, color: 'bg-red-400' },
      { name: 'Aluminiumwerk (1 Monat)', value: 35, color: 'bg-red-600' },
      { name: 'Windpark (1 Monat)', value: 100, color: 'bg-red-800' }
    ]
  }
  
  // Maximaler Wert für die Skalierung
  const maxValue = Math.max(...scaleExamples[selectedScale].map(item => item.value))
  
  // Animation-Varianten
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  }
  
  return (
    <div>
      <div className="mb-4 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm">
          {(['kWh', 'MWh', 'GWh'] as const).map(scale => (
            <button
              key={scale}
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                selectedScale === scale
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
              } ${scale === 'kWh' ? 'rounded-l-lg' : ''} ${scale === 'GWh' ? 'rounded-r-lg' : ''}`}
              onClick={() => setSelectedScale(scale)}
            >
              {scale}
            </button>
          ))}
        </div>
      </div>
      
      <motion.div
        key={selectedScale}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {scaleExamples[selectedScale].map((item, index) => (
          <motion.div key={index} variants={itemVariants} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span className="font-medium">{item.value} {selectedScale}</span>
            </div>
            <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color}`} 
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold text-center mb-1">Verhältnis der Einheiten:</p>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="font-bold">1 kWh</div>
            <div>1 Kilowattstunde</div>
          </div>
          <div>→</div>
          <div className="text-center">
            <div className="font-bold">1 MWh</div>
            <div>1.000 kWh</div>
          </div>
          <div>→</div>
          <div className="text-center">
            <div className="font-bold">1 GWh</div>
            <div>1.000.000 kWh</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScaleVisualization 