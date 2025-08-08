import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import LineChart from '../charts/LineChart'
import PieChart from '../charts/PieChart'
import BarChart from '../charts/BarChart'

type HeatPumpModel = 'aroTHERM' | 'geoTHERM' | 'flexoTHERM'
type BuildingQuality = 'old' | 'standard' | 'efficient'

function round(value: number, digits = 2): number {
  const p = Math.pow(10, digits)
  return Math.round(value * p) / p
}

function calculateCOPAdvanced(params: {
  model: HeatPumpModel
  mode: OperatingMode
  outsideTemp: number
  insideTemp: number
  flowTemp: number
  dhwTemp: number
  humidity: number
  windSpeed: number
}): number {
  const { model, mode, outsideTemp, insideTemp, flowTemp, dhwTemp, humidity, windSpeed } = params

  // Quasi-Carnot-Ansatz mit realistischem Gütegrad
  const approachHotK = 5 // K Temperaturdifferenz Kondensator-Annäherung
  const approachColdK = 5 // K Temperaturdifferenz Verdampfer-Annäherung

  let T_hot_K: number
  let T_cold_K: number
  if (mode === 'heating') {
    T_hot_K = flowTemp + approachHotK + 273.15
    T_cold_K = outsideTemp - approachColdK + 273.15
  } else if (mode === 'cooling') {
    // EER (Kühlen): kalte Seite ist Innen, warme ist Außen
    T_hot_K = outsideTemp + approachHotK + 273.15
    T_cold_K = insideTemp - approachColdK + 273.15
  } else {
    // Warmwasser
    T_hot_K = dhwTemp + approachHotK + 273.15
    T_cold_K = outsideTemp - approachColdK + 273.15
  }

  const deltaT = Math.max(1, T_hot_K - T_cold_K)
  const carnotHeating = T_hot_K / deltaT
  const carnotCooling = T_cold_K / deltaT

  const productEfficiency = model === 'geoTHERM' ? 0.55 : model === 'flexoTHERM' ? 0.5 : 0.45
  // Luftparameter: leichte Korrektur (hohe Feuchte leicht positiv, Wind negativ für Luft-WP)
  const humidityFactor = 1 + (humidity - 50) * 0.0005
  const windFactor = model === 'aroTHERM' ? Math.max(0.9, 1 - windSpeed * 0.01) : 1

  const base = (mode === 'cooling' ? carnotCooling : carnotHeating) * productEfficiency * humidityFactor * windFactor
  // Begrenzung auf plausible Bereiche
  const limited = Math.min(7, Math.max(1.2, base))
  return round(limited, 2)
}

function calculateThermalPowerKw(params: {
  mode: OperatingMode
  outsideTemp: number
  insideTemp: number
  houseSize: number
  buildingQuality: BuildingQuality
  persons: number
}): number {
  const { mode, outsideTemp, insideTemp, houseSize, buildingQuality, persons } = params
  // U*A Abschätzung in kW/K
  const uaPerM2_WK = buildingQuality === 'old' ? 1.2 : buildingQuality === 'standard' ? 0.8 : 0.5
  const infiltration = buildingQuality === 'old' ? 1.1 : buildingQuality === 'standard' ? 1.05 : 1.0
  const UA_kW_per_K = (uaPerM2_WK * houseSize * infiltration) / 1000

  if (mode === 'heating') {
    const dT = Math.max(0, insideTemp - outsideTemp)
    return round(UA_kW_per_K * dT, 2)
  }
  if (mode === 'cooling') {
    const dT = Math.max(0, outsideTemp - insideTemp)
    // Kühlbedarf typ. geringer wegen interner Massen, Faktor 0.7
    return round(UA_kW_per_K * dT * 0.7, 2)
  }
  // Warmwasser: Daumenregel ~ 3 kWh/Tag pro Person → durchschnittliche kW
  const dhwDailyKWh = persons * 3
  return round(dhwDailyKWh / 24, 2)
}

type OperatingMode = 'heating' | 'cooling' | 'dhw'

const HeatPumpModule: React.FC = () => {
  // UI-Zustände (an die Doku angelehnt)
  const [model, setModel] = useState<HeatPumpModel>('aroTHERM')
  const [outsideTemp, setOutsideTemp] = useState<number>(5)
  const [insideTemp, setInsideTemp] = useState<number>(21)
  const [pvSystem, setPvSystem] = useState<boolean>(true)
  const [houseSize, setHouseSize] = useState<number>(150)
  const [electricityPrice, setElectricityPrice] = useState<number>(0.35)
  const [buildingQuality, setBuildingQuality] = useState<BuildingQuality>('standard')
  const [humidity, setHumidity] = useState<number>(50)
  const [windSpeed, setWindSpeed] = useState<number>(1)
  const [flowTemp, setFlowTemp] = useState<number>(35)
  const [dhwTemp, setDhwTemp] = useState<number>(55)
  const [persons, setPersons] = useState<number>(3)
  const [expertMode, setExpertMode] = useState<boolean>(false)
  const [operatingMode, setOperatingMode] = useState<OperatingMode>('heating')
  const [tariffDay] = useState<number>(0.35)
  const [tariffNight] = useState<number>(0.25)
  const [useTimeOfUse] = useState<boolean>(false)
  const [season, setSeason] = useState<'winter'|'spring'|'summer'|'autumn'>('winter')

  // Saisonwahl beeinflusst sofort die Außentemperatur (typische Mittelwerte)
  useEffect(() => {
    const seasonalOutside: Record<typeof season, number> = {
      winter: -2,
      spring: 10,
      summer: 24,
      autumn: 10,
    }
    setOutsideTemp(seasonalOutside[season])
  }, [season])

  // Abgeleitete Kennzahlen
  const cop = useMemo(
    () => calculateCOPAdvanced({ model, mode: operatingMode, outsideTemp, insideTemp, flowTemp, dhwTemp, humidity, windSpeed }),
    [model, operatingMode, outsideTemp, insideTemp, flowTemp, dhwTemp, humidity, windSpeed]
  )
  const powerKw = useMemo(
    () => calculateThermalPowerKw({ mode: operatingMode, outsideTemp, insideTemp, houseSize, buildingQuality, persons }),
    [operatingMode, outsideTemp, insideTemp, houseSize, buildingQuality, persons]
  )
  const electricKw = useMemo(() => (cop > 0 ? round(powerKw / cop, 2) : 0), [powerKw, cop])
  const dynamicPrice = useMemo(() => {
    if (!useTimeOfUse) return electricityPrice
    // simple day/night split: 16h day, 8h night
    return round(((tariffDay * 16) + (tariffNight * 8)) / 24, 3)
  }, [useTimeOfUse, electricityPrice, tariffDay, tariffNight])
  // reserviert: ggf. weitere Saisoneinflüsse und Modus-Faktoren
  const costPerKWh = useMemo(() => (pvSystem ? dynamicPrice * 0.3 : dynamicPrice), [pvSystem, dynamicPrice])
  const dailyCost = useMemo(() => round(electricKw * 24 * costPerKWh, 2), [electricKw, costPerKWh])
  const monthlyCost = useMemo(() => round(dailyCost * 30, 2), [dailyCost])
  const yearlyCost = useMemo(() => round(dailyCost * 365, 2), [dailyCost])
  const co2DailyKg = useMemo(() => round((pvSystem ? 0.05 : 0.4) * electricKw * 24, 2), [pvSystem, electricKw])

  // Diagrammdaten
  const copCurveData = useMemo(() => {
    const temps = Array.from({ length: 12 }, (_, i) => -20 + i * 5) // -20..35 in 5er-Schritten
    return temps.map((t) => ({
      temp: t,
      cop: calculateCOPAdvanced({ model, mode: operatingMode, outsideTemp: t, insideTemp, flowTemp, dhwTemp, humidity, windSpeed }),
    }))
  }, [model, operatingMode, insideTemp, flowTemp, dhwTemp, humidity, windSpeed])

  const copVsFlowData = useMemo(() => {
    const temps = Array.from({ length: 9 }, (_, i) => 25 + i * 5) // 25..65°C
    return temps.map((ft) => ({
      flow: ft,
      cop: calculateCOPAdvanced({ model, mode: 'heating', outsideTemp, insideTemp, flowTemp: ft, dhwTemp, humidity, windSpeed })
    }))
  }, [model, outsideTemp, insideTemp, dhwTemp, humidity, windSpeed])

  const energyMixData = useMemo(() => {
    const environmentalKw = Math.max(0, round(powerKw - electricKw, 2))
    const safeElectric = Math.max(0, electricKw)
    const total = environmentalKw + safeElectric
    const toPercent = (v: number) => (total > 0 ? round((v / total) * 100, 1) : 0)
    return [
      { name: 'Elektrisch', value: toPercent(safeElectric), color: '#60a5fa' },
      { name: 'Umweltwärme', value: toPercent(environmentalKw), color: '#34d399' },
    ]
  }, [powerKw, electricKw])

  const monthlyTemps = [-1, 1, 5, 9, 14, 18, 20, 19, 15, 10, 5, 1]
  const monthlyCostData = useMemo(() => {
    return monthlyTemps.map((t, idx) => {
      // Heizen wenn innen>t; Kühlen nur bei aktiver Kühlung und t>innen
      let mode: OperatingMode = operatingMode
      if (operatingMode === 'heating' && t >= insideTemp) mode = 'heating'
      if (operatingMode === 'cooling' && t <= insideTemp) mode = 'cooling'

      const qKw = calculateThermalPowerKw({ mode, outsideTemp: t, insideTemp, houseSize, buildingQuality, persons })
      const copMonth = calculateCOPAdvanced({ model, mode, outsideTemp: t, insideTemp, flowTemp, dhwTemp, humidity, windSpeed })
      const eKw = copMonth > 0 ? qKw / copMonth : 0
      const days = [31,28,31,30,31,30,31,31,30,31,30,31][idx]
      const cost = round(eKw * 24 * days * costPerKWh, 2)
      return { month: idx + 1, cost }
    })
  }, [monthlyTemps, operatingMode, insideTemp, houseSize, buildingQuality, persons, model, flowTemp, dhwTemp, humidity, windSpeed, costPerKWh])

  const hourlyConsumption = useMemo(() => {
    // einfache Kurve: nachts 70% last, tags 100%, abends 120%
    const hours = Array.from({ length: 24 }, (_, h) => h)
    return hours.map((h) => {
      const profile = h < 6 ? 0.7 : h < 18 ? 1.0 : 1.2
      const modeAdj = operatingMode === 'cooling' ? (h >= 12 && h <= 18 ? 1.2 : 0.9) : 1
      const kw = round(electricKw * profile * modeAdj, 2)
      return { hour: `${h}:00`, electricKw: kw }
    })
  }, [electricKw, operatingMode])

  // Reserviert für spätere Aufschlüsselungen (Kosten)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 justify-center">
          <img src="/Vaillant_small.png" alt="Vaillant" className="h-8 w-auto" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Wärmepumpe</h1>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          Interaktive Visualisierung der Wärmepumpe: Parameter steuern COP, Leistung, Kosten und CO₂. Inhalte basieren auf der Dokumentation.
        </p>
      </div>

      {/* Interaktive Oberfläche */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-5 lg:sticky lg:top-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Einstellungen</h3>
              <label className="inline-flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-300">Expert:in</span>
                <input type="checkbox" className="toggle toggle-sm" checked={expertMode} onChange={(e) => setExpertMode(e.target.checked)} />
              </label>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300">Modell</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value as HeatPumpModel)}
                  className="mt-1 w-full py-2 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                >
                  <option value="aroTHERM">aroTHERM</option>
                  <option value="geoTHERM">geoTHERM</option>
                  <option value="flexoTHERM">flexoTHERM</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300">Betriebsart</label>
                  <select
                    value={operatingMode}
                    onChange={(e) => setOperatingMode(e.target.value as OperatingMode)}
                    className="mt-1 w-full py-2 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  >
                    <option value="heating">Heizen</option>
                    <option value="cooling">Kühlen</option>
                    <option value="dhw">Warmwasser</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300">Jahreszeit</label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value as any)}
                    className="mt-1 w-full py-2 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  >
                    <option value="winter">Winter</option>
                    <option value="spring">Frühling</option>
                    <option value="summer">Sommer</option>
                    <option value="autumn">Herbst</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300">Gebäude-Qualität</label>
                <select
                  value={buildingQuality}
                  onChange={(e) => setBuildingQuality(e.target.value as BuildingQuality)}
                  className="mt-1 w-full py-2 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                >
                  <option value="old">Altbau (höhere Verluste)</option>
                  <option value="standard">Durchschnitt</option>
                  <option value="efficient">Effizienzhaus</option>
                </select>
              </div>

              <div className="pt-1">
                <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Außentemperatur: {outsideTemp}°C</span>
                </label>
                <input type="range" min={-20} max={35} step={1} value={outsideTemp} onChange={(e) => setOutsideTemp(Number(e.target.value))} className="w-full" />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Innentemperatur: {insideTemp}°C</span>
                </label>
                <input type="range" min={18} max={24} step={1} value={insideTemp} onChange={(e) => setInsideTemp(Number(e.target.value))} className="w-full" />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Hausgröße: {houseSize} m²</span>
                </label>
                <input type="range" min={60} max={300} step={10} value={houseSize} onChange={(e) => setHouseSize(Number(e.target.value))} className="w-full" />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Strompreis: {electricityPrice.toFixed(2)} €/kWh</span>
                </label>
                <input type="range" min={0.2} max={0.6} step={0.01} value={electricityPrice} onChange={(e) => setElectricityPrice(Number(e.target.value))} className="w-full" />
              </div>

              {operatingMode !== 'dhw' && (
                <div className="pt-1">
                  <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Vorlauftemperatur: {flowTemp}°C</span>
                  </label>
                  <input type="range" min={operatingMode === 'heating' ? 25 : 12} max={operatingMode === 'heating' ? 60 : 20} step={1} value={flowTemp} onChange={(e) => setFlowTemp(Number(e.target.value))} className="w-full" />
                </div>
              )}

              {operatingMode === 'dhw' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>WW-Temperatur: {dhwTemp}°C</span>
                    </label>
                    <input type="range" min={45} max={60} step={1} value={dhwTemp} onChange={(e) => setDhwTemp(Number(e.target.value))} className="w-full" />
                  </div>
                  <div>
                    <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Personen: {persons}</span>
                    </label>
                    <input type="range" min={1} max={6} step={1} value={persons} onChange={(e) => setPersons(Number(e.target.value))} className="w-full" />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">PV-System</span>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={pvSystem} onChange={(e) => setPvSystem(e.target.checked)} />
                  <span className="text-sm">aktiv</span>
                </label>
              </div>

              {expertMode && (
                <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div>
                    <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Luftfeuchte: {humidity}% rF</span>
                    </label>
                    <input type="range" min={10} max={90} step={1} value={humidity} onChange={(e) => setHumidity(Number(e.target.value))} className="w-full" />
                  </div>
                  <div>
                    <label className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Windgeschwindigkeit: {windSpeed} m/s</span>
                    </label>
                    <input type="range" min={0} max={10} step={0.5} value={windSpeed} onChange={(e) => setWindSpeed(Number(e.target.value))} className="w-full" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visualisierung */}
        <div className="lg:col-span-2 space-y-5">
          {/* KPI-Karten */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400">COP</div>
              <div className="text-2xl font-semibold">{cop.toFixed(2)}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Modell-/Klimaabhängig</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400">Heizleistung</div>
              <div className="text-2xl font-semibold">{powerKw.toFixed(2)} kW</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">bei aktuellen Parametern</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400">Tageskosten</div>
              <div className="text-2xl font-semibold">{dailyCost.toFixed(2)} €</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Monat: {monthlyCost.toFixed(0)} €, Jahr: {yearlyCost.toFixed(0)} €</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400">CO₂ pro Tag</div>
              <div className="text-2xl font-semibold">{co2DailyKg.toFixed(2)} kg</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">mit{pvSystem ? '' : ' ohne'} PV</div>
            </div>
          </div>

          {/* Diagramme */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <LineChart
              data={copCurveData}
              xAxisKey="temp"
              lines={[{ name: 'COP', dataKey: 'cop', color: '#f59e0b' }]}
              title="COP über Außentemperatur"
              xAxisLabel="Außentemperatur (°C)"
              yAxisLabel="COP"
            />

            <PieChart
              data={energyMixData}
              title="Energiefluss-Anteile (thermische Leistung)"
              valueUnit="%"
              innerRadius={60}
              outerRadius={90}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <LineChart
              data={copVsFlowData}
              xAxisKey="flow"
              lines={[{ name: 'COP', dataKey: 'cop', color: '#10b981' }]}
              title="COP über Vorlauftemperatur (Heizen)"
              xAxisLabel="Vorlauftemperatur (°C)"
              yAxisLabel="COP"
            />

            <BarChart
              data={monthlyCostData}
              xKey="month"
              yKey="cost"
              label="Kosten (€)"
              color="#6366f1"
              title="Monatskosten (Modelljahr)"
            />
          </div>

          {/* Zusatzdiagramme */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <LineChart
              data={hourlyConsumption}
              xAxisKey="hour"
              lines={[{ name: 'elektrisch (kW)', dataKey: 'electricKw', color: '#60a5fa' }]}
              title={`Tagesprofil Strombedarf (${useTimeOfUse ? 'Zeittarif aktiv' : 'Fixpreis'})`}
              xAxisLabel="Uhrzeit"
              yAxisLabel="kW"
            />

            <BarChart
              data={hourlyConsumption.map((d, i) => ({ period: `${i+1}`, kWh: round(d.electricKw, 2) }))}
              xKey="period"
              yKey="kWh"
              label="Strom (kW approximiert)"
              color="#34d399"
              title="Verbrauchsverteilung (24h)"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HeatPumpModule


