import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { weatherOptions, solarProductionByHour, windProductionByHour } from '../../data/mockData'
import { WeatherCondition, RenewableProduction } from '../../types'
import WeatherControl from './WeatherControl'
import ProductionChart from './ProductionChart'
import RenewableSummary from './RenewableSummary'

const RenewableModule = () => {
  const [weather, setWeather] = useState<WeatherCondition>(weatherOptions[0])
  const [productions, setProductions] = useState<RenewableProduction[]>([])
  
  // Produktionsdaten basierend auf dem Wetter berechnen
  useEffect(() => {
    // Faktoren für verschiedene Wetterbedingungen
    const weatherFactors = {
      sunny: { solar: 1, wind: 0.7 },
      partially_cloudy: { solar: 0.7, wind: 0.8 },
      cloudy: { solar: 0.3, wind: 0.9 },
      rainy: { solar: 0.1, wind: 1.1 },
      stormy: { solar: 0.05, wind: 1.7 }
    }
    
    // Wetterfaktoren abrufen
    const factor = weatherFactors[weather.type]
    
    // Kombinierte Produktionsdaten für jede Stunde
    const hourlyProduction = Array.from({ length: 24 }, (_, hour) => {
      // Solar- und Windproduktion basierend auf Faktoren und Wetter
      const solarValue = solarProductionByHour[hour].production * factor.solar
      let windValue = windProductionByHour[hour].production * factor.wind
      
      // Zusätzlicher Faktor für Windgeschwindigkeit
      windValue *= (weather.windSpeed / 20) // Normalisiert auf 20 km/h als Basislinie
      
      return {
        solar: parseFloat(solarValue.toFixed(2)),
        wind: parseFloat(windValue.toFixed(2)),
        timestamp: new Date(new Date().setHours(hour, 0, 0, 0))
      }
    })
    
    setProductions(hourlyProduction)
  }, [weather])
  
  // Tägliche Gesamtproduktion
  const totalSolar = productions.reduce((total, hour) => total + hour.solar, 0)
  const totalWind = productions.reduce((total, hour) => total + hour.wind, 0)
  const totalProduction = totalSolar + totalWind

  // Daten für Diagramme formatieren
  const chartData = productions.map((prod, index) => ({
    hour: index,
    solar: prod.solar,
    wind: prod.wind,
    total: prod.solar + prod.wind
  }))
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        <div className="md:col-span-2">
          <RenewableSummary 
            solarTotal={totalSolar} 
            windTotal={totalWind} 
            combinedTotal={totalProduction} 
          />
          <div className="mt-3 md:mt-6">
            <ProductionChart data={chartData} />
          </div>
        </div>
        <div className="space-y-3 md:space-y-6 mt-3 md:mt-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 md:p-6">
            <h3 className="text-md md:text-lg font-semibold mb-4">Wetterbedingungen</h3>
            <WeatherControl 
              weather={weather} 
              setWeather={setWeather} 
              options={weatherOptions} 
            />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 md:p-6">
            <h3 className="text-md md:text-lg font-semibold mb-4">Wusstest du?</h3>
            <div className="prose prose-sm dark:prose-invert">
              <p>Eine einzige Windturbine mit 2 MW Leistung kann bis zu 4.000 Haushalte mit Strom versorgen.</p>
              <p>Deutschland hat im Jahr 2020 rund 45% seines Stroms aus erneuerbaren Energien erzeugt.</p>
              <p>Solaranlagen in Deutschland produzieren bei sonnigem Wetter bis zu 40 GW Strom.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RenewableModule 