import { motion } from 'framer-motion'
import { HouseholdUsageSummary } from '../../types'

interface UsageSummaryProps {
  summary: HouseholdUsageSummary
}

const UsageSummary: React.FC<UsageSummaryProps> = ({ summary }) => {
  const metrics = [
    {
      id: 'daily',
      label: 'Täglicher Verbrauch',
      value: summary.totalDailyUsage.toFixed(2),
      unit: 'kWh',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 'weekly',
      label: 'Wöchentlicher Verbrauch',
      value: summary.totalWeeklyUsage.toFixed(2),
      unit: 'kWh',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'monthly',
      label: 'Monatliche Kosten',
      value: summary.totalMonthlyCost.toFixed(2),
      unit: '€',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-6">
      <h3 className="text-md sm:text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Verbrauchsübersicht</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex-shrink-0 text-blue-500 dark:text-blue-400">
                {metric.icon}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">{metric.label}</p>
                <div className="flex items-baseline">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                  <p className="ml-1 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">{metric.unit}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6">
        <h4 className="text-md font-medium mb-2 text-gray-700 dark:text-gray-300">Energiespartipps</h4>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Vermeiden Sie den Standby-Modus bei elektronischen Geräten</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Verwenden Sie energieeffiziente LED-Beleuchtung</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Waschen Sie mit niedrigeren Temperaturen (30-40°C)</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UsageSummary 