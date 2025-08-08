// Haushalt-Typen
export interface HouseholdDevice {
  id: string
  name: string
  category: 'kitchen' | 'entertainment' | 'heating' | 'lighting' | 'other'
  powerConsumption: number // in Watt
  hoursPerDay: number
  isActive: boolean
}

export interface HouseholdUsageSummary {
  totalDailyUsage: number // kWh
  totalWeeklyUsage: number // kWh
  totalMonthlyCost: number // Euro
  deviceBreakdown: { name: string; usage: number; percentage: number }[]
  timeDistribution: { hour: number; usage: number }[]
}

// Erneuerbare Energien-Typen
export interface WeatherCondition {
  type: 'sunny' | 'partially_cloudy' | 'cloudy' | 'rainy' | 'stormy'
  windSpeed: number // in km/h
  temperature: number // in Celsius
  time: Date
}

export interface RenewableProduction {
  solar: number // kWh
  wind: number // kWh
  timestamp: Date
}

// Vergleichs-Typen
export interface EnergyComparison {
  entityName: string
  consumption: number
  unit: 'kWh' | 'MWh' | 'GWh'
  type: 'household' | 'city' | 'industry' | 'country'
}

export interface EnergySourceDistribution {
  source: string
  percentage: number
  color: string
} 