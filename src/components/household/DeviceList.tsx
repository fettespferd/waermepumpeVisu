import { motion } from 'framer-motion'
import { HouseholdDevice } from '../../types'

interface DeviceListProps {
  devices: HouseholdDevice[]
  toggleStatus: (id: string) => void
  updateHours: (id: string, hours: number) => void
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, toggleStatus, updateHours }) => {
  // Geräte nach Kategorie gruppieren
  const groupedDevices = devices.reduce<Record<string, HouseholdDevice[]>>(
    (groups, device) => {
      const category = device.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(device)
      return groups
    },
    {}
  )

  // Kategorie-Namen für die Anzeige
  const categoryLabels: Record<string, string> = {
    kitchen: 'Küche',
    entertainment: 'Unterhaltung',
    heating: 'Heizung',
    lighting: 'Beleuchtung',
    other: 'Sonstiges'
  }

  // Stunden in ein Format umwandeln, das im Input-Feld angezeigt werden kann
  const formatHours = (hours: number) => {
    if (Number.isInteger(hours)) {
      return hours.toString()
    }
    return hours.toString()
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedDevices).map(([category, categoryDevices]) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <h4 className="font-medium text-gray-800 dark:text-gray-200">
            {categoryLabels[category] || category}
          </h4>
          {/* Mobile: Karten-Layout */}
          <div className="block md:hidden space-y-3">
            {categoryDevices.map((device) => (
              <div key={device.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 flex flex-col gap-2 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{device.name}</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={device.isActive}
                      onChange={() => toggleStatus(device.id)}
                      className="sr-only peer"
                    />
                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Leistung:</span>
                  <span>{device.powerConsumption} W</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 items-center">
                  <span>Stunden/Tag:</span>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={formatHours(device.hoursPerDay)}
                    onChange={(e) => {
                      const hours = parseFloat(e.target.value) || 0
                      updateHours(device.id, Math.min(24, Math.max(0, hours)))
                    }}
                    className="w-14 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white ml-2"
                  />
                </div>
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{device.isActive ? 'An' : 'Aus'}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop: Tabelle */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Gerät
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Leistung
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Stunden/Tag
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {categoryDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{device.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{device.powerConsumption} W</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        step="0.5"
                        value={formatHours(device.hoursPerDay)}
                        onChange={(e) => {
                          const hours = parseFloat(e.target.value) || 0
                          updateHours(device.id, Math.min(24, Math.max(0, hours)))
                        }}
                        className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={device.isActive}
                          onChange={() => toggleStatus(device.id)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {device.isActive ? 'An' : 'Aus'}
                        </span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default DeviceList 