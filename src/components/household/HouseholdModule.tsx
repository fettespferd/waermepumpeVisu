import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { mockDevices, dailyUsagePattern } from '../../data/mockData'
import { HouseholdDevice, HouseholdUsageSummary } from '../../types'
import DeviceList from './DeviceList'
import UsageSummary from './UsageSummary'
import LineChart from '../charts/LineChart'
import PieChart from '../charts/PieChart'

const HouseholdModule = () => {
  const [devices, setDevices] = useState<HouseholdDevice[]>(mockDevices)
  const [summary, setSummary] = useState<HouseholdUsageSummary>({
    totalDailyUsage: 0,
    totalWeeklyUsage: 0,
    totalMonthlyCost: 0,
    deviceBreakdown: [],
    timeDistribution: dailyUsagePattern
  })

  // Berechne die Nutzungszusammenfassung, wenn sich die Geräte ändern
  useEffect(() => {
    const activeDevices = devices.filter(device => device.isActive)
    
    // Täglicher Gesamtverbrauch (kWh)
    const totalDailyUsage = activeDevices.reduce(
      (sum, device) => sum + (device.powerConsumption * device.hoursPerDay) / 1000,
      0
    )
    
    // Wöchentlicher Gesamtverbrauch (kWh)
    const totalWeeklyUsage = totalDailyUsage * 7
    
    // Monatliche Kosten (€) bei einem durchschnittlichen Preis von 0,30 €/kWh
    const totalMonthlyCost = totalDailyUsage * 30 * 0.3
    
    // Aufschlüsselung nach Gerät
    const deviceBreakdown = activeDevices.map(device => {
      const usage = (device.powerConsumption * device.hoursPerDay) / 1000
      return {
        name: device.name,
        usage,
        percentage: (usage / totalDailyUsage) * 100
      }
    })
    
    setSummary({
      totalDailyUsage,
      totalWeeklyUsage,
      totalMonthlyCost,
      deviceBreakdown,
      timeDistribution: dailyUsagePattern
    })
  }, [devices])

  // Gerätestatus umschalten
  const toggleDeviceStatus = (id: string) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, isActive: !device.isActive } : device
      )
    )
  }

  // Nutzungsdauer eines Geräts aktualisieren
  const updateDeviceHours = (id: string, hours: number) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, hoursPerDay: hours } : device
      )
    )
  }

  // Vorbereitung der Daten für das Kreisdiagramm
  const pieChartData = summary.deviceBreakdown.map(item => ({
    name: item.name,
    value: parseFloat(item.usage.toFixed(2)),
    color: getColorByCategory(devices.find(d => d.name === item.name)?.category || 'other')
  }))

  // Farbe für Kategorien festlegen
  function getColorByCategory(category: string) {
    const colors = {
      kitchen: '#f59e0b',
      entertainment: '#3b82f6',
      heating: '#ef4444',
      lighting: '#f97316',
      other: '#8b5cf6'
    }
    return colors[category as keyof typeof colors] || colors.other
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-3 sm:space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        <div className="md:col-span-2">
          <UsageSummary summary={summary} />
          <div className="mt-3 md:mt-6">
            <LineChart 
              title="Täglicher Stromverbrauch-Zyklus"
              data={summary.timeDistribution}
              xAxisKey="hour"
              lines={[
                { name: 'Verbrauch (kWh)', dataKey: 'usage', color: '#3b82f6' }
              ]}
              xAxisLabel="Stunde"
              yAxisLabel="kWh"
            />
          </div>
        </div>
        <div className="mt-3 md:mt-0">
          <PieChart 
            data={pieChartData}
            title="Verbrauch nach Gerät"
            valueUnit=" kWh"
          />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 md:p-6">
        <h3 className="text-md md:text-lg font-semibold mb-4">Geräte verwalten</h3>
        <DeviceList 
          devices={devices} 
          toggleStatus={toggleDeviceStatus} 
          updateHours={updateDeviceHours} 
        />
      </div>
    </motion.div>
  )
}

export default HouseholdModule 