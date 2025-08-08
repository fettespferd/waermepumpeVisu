import { motion } from 'framer-motion'
import { WeatherCondition } from '../../types'

interface WeatherControlProps {
  weather: WeatherCondition
  setWeather: (weather: WeatherCondition) => void
  options: WeatherCondition[]
}

const WeatherControl: React.FC<WeatherControlProps> = ({ weather, setWeather, options }) => {
  // Übersetzungen für die Wettertypen
  const weatherLabels: Record<string, string> = {
    sunny: 'Sonnig',
    partially_cloudy: 'Teilweise bewölkt',
    cloudy: 'Bewölkt',
    rainy: 'Regnerisch',
    stormy: 'Stürmisch'
  }

  // Wettersymbole
  const weatherIcons: Record<string, React.ReactNode> = {
    sunny: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    partially_cloudy: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    cloudy: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    rainy: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    stormy: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }

  return (
    <div className="space-y-4">
      {/* Wetteroptionen */}
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <motion.button
            key={option.type}
            className={`p-3 rounded-lg flex flex-col items-center justify-center ${
              weather.type === option.type
                ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500'
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => setWeather(option)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="mb-2">{weatherIcons[option.type]}</div>
            <span className="text-sm font-medium">{weatherLabels[option.type]}</span>
            <span className="text-xs text-gray-500 dark:text-gray-300">{option.temperature}°C</span>
          </motion.button>
        ))}
      </div>

      {/* Windgeschwindigkeit */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Windgeschwindigkeit: {weather.windSpeed} km/h
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={weather.windSpeed}
          onChange={(e) => {
            const newSpeed = parseInt(e.target.value)
            setWeather({
              ...weather,
              windSpeed: newSpeed
            })
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-2"
        />
      </div>

      {/* Aktuelle Wetterbedingungen */}
      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mt-3">
        <h4 className="text-sm font-medium mb-2">Aktuelle Bedingungen:</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <span className="text-gray-500 dark:text-gray-400 mr-2">Temperatur:</span>
            <span>{weather.temperature}°C</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 dark:text-gray-400 mr-2">Wind:</span>
            <span>{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherControl 