import { motion } from 'framer-motion'

type NavbarProps = {
  activeTab: 'household' | 'renewable' | 'comparison' | 'heatpump'
  setActiveTab: (tab: 'household' | 'renewable' | 'comparison' | 'heatpump') => void
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'household', label: 'Haushalt' },
    { id: 'renewable', label: 'Erneuerbare Energien' },
    { id: 'comparison', label: 'Energievergleich' },
    { id: 'heatpump', label: 'Wärmepumpe' },
  ] as const

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-xl font-bold">EnergieExpert</span>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <select 
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as 'household' | 'renewable' | 'comparison' | 'heatpump')}
              className="block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 