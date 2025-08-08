import { useState } from 'react'
import { motion } from 'framer-motion'
import Dashboard from './components/layout/Dashboard'
import Navbar from './components/layout/Navbar'
import ThemeToggle from './components/layout/ThemeToggle'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [activeTab, setActiveTab] = useState<'household' | 'renewable' | 'comparison' | 'heatpump'>('household')

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Energieverbrauch & -produktion verstehen
            </h1>
            <Dashboard activeTab={activeTab} />
          </motion.div>
        </main>
        <div className="fixed bottom-5 right-5">
          <ThemeToggle />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
