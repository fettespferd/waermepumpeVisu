import { HouseholdDevice, WeatherCondition, EnergyComparison, EnergySourceDistribution } from '../types'

// Haushaltsgeräte
export const mockDevices: HouseholdDevice[] = [
  {
    id: 'device-1',
    name: 'Kühlschrank',
    category: 'kitchen',
    powerConsumption: 100,
    hoursPerDay: 24,
    isActive: true
  },
  {
    id: 'device-2',
    name: 'Waschmaschine',
    category: 'kitchen',
    powerConsumption: 500,
    hoursPerDay: 1,
    isActive: true
  },
  {
    id: 'device-3',
    name: 'Fernseher',
    category: 'entertainment',
    powerConsumption: 150,
    hoursPerDay: 4,
    isActive: true
  },
  {
    id: 'device-4',
    name: 'Heizung',
    category: 'heating',
    powerConsumption: 1500,
    hoursPerDay: 6,
    isActive: true
  },
  {
    id: 'device-5',
    name: 'LED-Beleuchtung',
    category: 'lighting',
    powerConsumption: 50,
    hoursPerDay: 5,
    isActive: true
  },
  {
    id: 'device-6',
    name: 'Elektroherd',
    category: 'kitchen',
    powerConsumption: 2000,
    hoursPerDay: 1,
    isActive: true
  },
  {
    id: 'device-7',
    name: 'Computer',
    category: 'entertainment',
    powerConsumption: 200,
    hoursPerDay: 8,
    isActive: true
  },
  {
    id: 'device-8',
    name: 'Trockner',
    category: 'kitchen',
    powerConsumption: 2500,
    hoursPerDay: 0.5,
    isActive: false
  }
]

// Wetterbedingungen für erneuerbare Energien
export const weatherOptions: WeatherCondition[] = [
  { type: 'sunny', windSpeed: 10, temperature: 25, time: new Date() },
  { type: 'partially_cloudy', windSpeed: 15, temperature: 20, time: new Date() },
  { type: 'cloudy', windSpeed: 20, temperature: 15, time: new Date() },
  { type: 'rainy', windSpeed: 25, temperature: 10, time: new Date() },
  { type: 'stormy', windSpeed: 40, temperature: 5, time: new Date() }
]

// Energievergleichsdaten
export const energyComparisonData: EnergyComparison[] = [
  { entityName: 'Durchschnittlicher deutscher Haushalt', consumption: 3500, unit: 'kWh', type: 'household' },
  { entityName: 'Berlin', consumption: 13.4, unit: 'GWh', type: 'city' },
  { entityName: 'Automobilindustrie', consumption: 42, unit: 'GWh', type: 'industry' },
  { entityName: 'Deutschland', consumption: 500, unit: 'GWh', type: 'country' }
]

// Energiequellenverteilung für Deutschland
export const germanEnergyMix: EnergySourceDistribution[] = [
  { source: 'Wind', percentage: 23.5, color: '#76C7C0' },
  { source: 'Solar', percentage: 10.6, color: '#FFC658' },
  { source: 'Biomasse', percentage: 8.7, color: '#8FBC94' },
  { source: 'Wasserkraft', percentage: 3.8, color: '#5DA5DA' },
  { source: 'Kernenergie', percentage: 11.3, color: '#E2798E' },
  { source: 'Braunkohle', percentage: 17.4, color: '#B07D62' },
  { source: 'Steinkohle', percentage: 9.4, color: '#4D4D4D' },
  { source: 'Erdgas', percentage: 15.3, color: '#D3D3D3' }
]

// Simulation von Energieverbrauchsdaten über 24 Stunden
export const dailyUsagePattern = Array.from({ length: 24 }, (_, hour) => {
  // Weniger Verbrauch nachts, Spitzen am Morgen und Abend
  let baseLoad = 0.2 // minimale Grundlast
  
  // Morgenspitze (7-9 Uhr)
  if (hour >= 7 && hour < 9) {
    baseLoad += 0.8
  } 
  // Abendspitze (18-22 Uhr)
  else if (hour >= 18 && hour < 22) {
    baseLoad += 1
  }
  // Normale Tageszeit
  else if (hour >= 9 && hour < 18) {
    baseLoad += 0.5
  }
  
  return {
    hour,
    usage: baseLoad + Math.random() * 0.3 // kleine Zufallsschwankung
  }
})

// Simulation von Solarenergieerzeugung basierend auf Tageszeit
export const solarProductionByHour = Array.from({ length: 24 }, (_, hour) => {
  let production = 0
  
  // Tageslicht-Stunden (6-20 Uhr mit Peak um 13 Uhr)
  if (hour >= 6 && hour <= 20) {
    // Parabelförmige Kurve mit Maximum um 13 Uhr
    production = Math.max(0, 1 - Math.pow((hour - 13) / 7, 2)) * 5
  }
  
  return {
    hour,
    production
  }
})

// Simulation von Windenergieerzeugung (mit zufälligen Schwankungen)
export const windProductionByHour = Array.from({ length: 24 }, (_, hour) => {
  // Grundlast mit zufälligen Schwankungen
  const production = 1.5 + Math.sin(hour / 12 * Math.PI) + Math.random() * 1.5
  
  return {
    hour,
    production: Math.max(0, production)
  }
}) 