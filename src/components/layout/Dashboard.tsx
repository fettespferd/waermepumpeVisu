import { motion, AnimatePresence } from 'framer-motion'
import HouseholdModule from '../household/HouseholdModule'
import RenewableModule from '../renewable/RenewableModule'
import ComparisonModule from '../comparison/ComparisonModule'
import HeatPumpModule from '../heatpump/HeatPumpModule'

type DashboardProps = {
  activeTab: 'household' | 'renewable' | 'comparison' | 'heatpump'
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-6">
      <AnimatePresence mode="wait">
        {activeTab === 'household' && (
          <motion.div
            key="household"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <HouseholdModule />
          </motion.div>
        )}
        
        {activeTab === 'renewable' && (
          <motion.div
            key="renewable"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <RenewableModule />
          </motion.div>
        )}
        
        {activeTab === 'comparison' && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ComparisonModule />
          </motion.div>
        )}

        {activeTab === 'heatpump' && (
          <motion.div
            key="heatpump"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <HeatPumpModule />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dashboard 