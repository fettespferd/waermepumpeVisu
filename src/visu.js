import React, { useState, useEffect } from 'react';
import { Thermometer, Leaf, Euro, Info, Sun, Home, Settings, TrendingUp, Snowflake, Flame, Wind, Droplets, Calendar, Calculator, Award, Target, Gauge } from 'lucide-react';

const VaillantHeatPumpVisualizer = () => {
  const [targetAudience, setTargetAudience] = useState('adults');
  const [outsideTemp, setOutsideTemp] = useState(5);
  const [insideTemp, setInsideTemp] = useState(21);
  const [heatPumpModel, setHeatPumpModel] = useState('aroTHERM');
  const [pvSystem, setPvSystem] = useState(false);
  const [humidity, setHumidity] = useState(60);
  const [windSpeed, setWindSpeed] = useState(3);
  const [heatingLoad, setHeatingLoad] = useState(8);
  const [electricityPrice, setElectricityPrice] = useState(0.32);
  const [houseSize, setHouseSize] = useState(150);
  const [season, setSeason] = useState('winter');
  const [operatingMode, setOperatingMode] = useState('heating');
  
  // Animation states
  const [animationPhase, setAnimationPhase] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Erweiterte Berechnungen für Experten-Modus
  const calculateAdvancedCOP = () => {
    const baseCOP = heatPumpModel === 'geoTHERM' ? 4.8 : heatPumpModel === 'flexoTHERM' ? 4.0 : 3.8;
    const tempDiff = Math.abs(outsideTemp - insideTemp);
    const efficiencyFactor = Math.max(0.2, 1 - (tempDiff * 0.015));
    const humidityFactor = 1 + ((humidity - 50) * 0.001);
    const windFactor = heatPumpModel === 'aroTHERM' ? (1 + (windSpeed * 0.02)) : 1;
    
    return Math.round((baseCOP * efficiencyFactor * humidityFactor * windFactor) * 100) / 100;
  };

  const calculatePower = () => {
    const baseLoad = heatingLoad;
    const tempFactor = Math.max(0.3, 1 + ((insideTemp - outsideTemp) * 0.04));
    const sizeFactor = houseSize / 150;
    return Math.round(baseLoad * tempFactor * sizeFactor * 100) / 100;
  };

  const calculateDetailedCosts = () => {
    const power = calculatePower();
    const cop = targetAudience === 'experts' ? calculateAdvancedCOP() : calculateAdvancedCOP();
    const electricPower = power / cop;
    const costPerKWh = pvSystem ? electricityPrice * 0.3 : electricityPrice;
    const dailyCost = electricPower * 24 * costPerKWh;
    return {
      daily: Math.round(dailyCost * 100) / 100,
      monthly: Math.round(dailyCost * 30 * 100) / 100,
      yearly: Math.round(dailyCost * 365 * 100) / 100
    };
  };

  const calculateCO2 = () => {
    const power = calculatePower();
    const cop = targetAudience === 'experts' ? calculateAdvancedCOP() : calculateAdvancedCOP();
    const electricPower = power / cop;
    const co2Factor = pvSystem ? 0.05 : 0.4;
    return Math.round(electricPower * co2Factor * 24 * 100) / 100;
  };

  // Content für verschiedene Zielgruppen
  const getAudienceContent = () => {
    const content = {
      kids: {
        title: "🌟 Die magische Wärmepumpe!",
        subtitle: "Wie bringen wir Wärme ins Haus?",
        explanation: "Die Wärmepumpe ist wie ein fleißiger Helfer, der auch bei Kälte draußen noch Wärme findet und sie zu uns nach Hause bringt!",
        visualStyle: "playful",
        parameters: ['outsideTemp', 'insideTemp', 'pvSystem'],
        kpis: ['simple']
      },
      adults: {
        title: "Vaillant Wärmepumpe - Ihre smarte Heizlösung",
        subtitle: "Effizient heizen & Kosten sparen",
        explanation: "Entdecken Sie, wie eine Vaillant Wärmepumpe Ihre Heizkosten um bis zu 70% reduziert und gleichzeitig die Umwelt schont.",
        visualStyle: "professional",
        parameters: ['outsideTemp', 'insideTemp', 'heatPumpModel', 'pvSystem', 'houseSize', 'electricityPrice'],
        kpis: ['efficiency', 'costs', 'environment']
      },
      experts: {
        title: "Vaillant Wärmepumpen-Systemanalyse",
        subtitle: "Technische Parameter & Performance-Optimierung",
        explanation: "Detaillierte Analyse der Systemeffizienz unter Berücksichtigung aller relevanten Umwelt- und Betriebsparameter.",
        visualStyle: "technical",
        parameters: ['outsideTemp', 'insideTemp', 'heatPumpModel', 'pvSystem', 'humidity', 'windSpeed', 'heatingLoad', 'electricityPrice', 'houseSize', 'season', 'operatingMode'],
        kpis: ['advanced_efficiency', 'detailed_costs', 'environmental_analysis', 'performance_metrics']
      }
    };
    return content[targetAudience];
  };

  // Kinder-Visualisierung - Verbesserte Version
  const KidsVisualization = () => (
    <div className="relative rounded-2xl p-6 h-96 overflow-hidden border border-gray-200" style={{background: 'linear-gradient(135deg, #a78bfa, #c4b5fd, #f472b6)'}}>
      {/* Sonne */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-xl">
        <div className="absolute inset-3 bg-yellow-300 rounded-full flex items-center justify-center text-2xl">
          ☀️
        </div>
      </div>
      
      {/* Großes Haus - Verbessert */}
      <div className="absolute bottom-6 right-6 w-36 h-28 bg-white rounded-2xl border-4 border-pink-400 shadow-2xl">
        <div className="w-full h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl"></div>
        <div className="p-4 text-center">
          <div className="text-3xl mb-2">🏠</div>
          <div className="text-xl font-bold text-gray-800">{insideTemp}°C</div>
          <div className="text-sm text-pink-600 font-bold">Warm & gemütlich!</div>
        </div>
      </div>

      {/* Wärmepumpe als freundlicher Roboter - Verbessert */}
      <div className="absolute bottom-6 left-6 w-28 h-24 bg-white rounded-2xl border-4 border-blue-400 shadow-2xl">
        <div className="p-3 text-center">
          <div className="text-3xl mb-2">🤖</div>
          <div className="text-sm font-bold text-blue-800">Wärme-Helfer</div>
          <div className="text-xs text-blue-600 mt-1">COP: {calculateAdvancedCOP()}</div>
        </div>
      </div>

      {/* Verbesserte animierte Wärme-Herzen */}
      <div className="absolute bottom-20 left-20 w-32 h-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-2xl transition-all duration-1000 drop-shadow-lg ${
              animationPhase >= (i % 4) ? 'opacity-100 translate-x-8' : 'opacity-0'
            }`}
            style={{ left: `${i * 20}px` }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* PV als Solarblumen - Verbessert */}
      {pvSystem && (
        <div className="absolute top-12 right-12">
          <div className="text-4xl animate-bounce drop-shadow-lg">🌻🌻🌻</div>
          <div className="text-sm text-center text-green-800 font-bold bg-white bg-opacity-90 rounded-xl px-3 py-2 shadow-lg">Solar-Power!</div>
        </div>
      )}

      {/* Temperaturanzeige */}
      <div className="absolute top-6 left-6 bg-white bg-opacity-90 rounded-xl p-3 shadow-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">❄️</span>
          <span className="text-sm font-bold text-blue-600">Draußen</span>
        </div>
        <div className="text-lg font-bold text-blue-600">{outsideTemp}°C</div>
      </div>

      {/* Erklärung - Verbessert */}
      <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-95 rounded-xl p-4 text-center shadow-lg border border-gray-300">
        <div className="text-sm font-bold text-purple-800">
          {outsideTemp < 0 ? "Auch bei Kälte finde ich Wärme! ❄️➡️🔥" : 
           outsideTemp < 10 ? "Ich sammle Wärme aus der Luft! 🌬️➡️🏠" :
           "Bei warmen Wetter arbeite ich besonders gut! ☀️➡️😊"}
        </div>
        <div className="text-xs text-gray-600 mt-2">
          Kosten: €{calculateDetailedCosts().daily} pro Tag
        </div>
      </div>
    </div>
  );

  // Erwachsenen-Visualisierung - Verbesserte Version
  const AdultsVisualization = () => (
    <div className="relative rounded-xl p-6 h-96 overflow-hidden border-2 border-gray-200" style={{background: 'linear-gradient(135deg, #f8fafc, #e2e8f0, #f1f5f9)'}}>
      {/* Haus */}
      <div className="absolute bottom-8 right-8 w-32 h-24 bg-white rounded-xl border-2 border-gray-300 shadow-lg">
        <div className="w-full h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl"></div>
        <div className="p-4 text-center">
          <Home className="w-10 h-10 mx-auto text-gray-600 mb-2" />
          <div className="text-lg font-bold text-gray-800">{insideTemp}°C</div>
          <div className="text-sm text-gray-600">{houseSize}m²</div>
        </div>
      </div>

      {/* Wärmepumpe */}
      <div className="absolute bottom-8 left-8 w-28 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg border-2 border-red-700">
        <div className="p-3 text-center text-white">
          <div className="text-xl font-bold mb-1">V</div>
          <div className="text-xs mb-2">{heatPumpModel}</div>
          <div className="flex justify-center">
            <div className={`w-3 h-3 rounded-full ${calculateAdvancedCOP() > 3 ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse shadow-lg`}></div>
          </div>
        </div>
      </div>

      {/* Verbesserter Wärmestrom */}
      <div className="absolute bottom-16 left-24 w-24 h-3 bg-gradient-to-r from-blue-400 via-orange-400 to-red-500 rounded-full opacity-90 shadow-md">
        <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
        </div>
      </div>

      {/* PV-Anlage - Verbessert */}
      {pvSystem && (
        <div className="absolute top-6 right-12 w-24 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg border border-blue-700 shadow-lg">
          <div className="grid grid-cols-6 gap-1 p-2">
            {[...Array(18)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-blue-400 rounded-sm animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
            ))}
          </div>
          <div className="text-xs text-center text-white font-medium">Solar</div>
        </div>
      )}

      {/* Außentemperatur-Display - Verbessert */}
      <div className="absolute top-6 left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Snowflake className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-semibold">Außen</span>
        </div>
        <div className="text-xl font-bold text-blue-600">{outsideTemp}°C</div>
      </div>

      {/* Effizienz-Indikator - Verbessert */}
      <div className="absolute top-24 left-6 bg-white rounded-xl p-3 shadow-lg border border-gray-200">
        <div className="text-xs text-gray-600 mb-1">COP</div>
        <div className={`text-xl font-bold ${calculateAdvancedCOP() > 3 ? 'text-green-600' : 'text-yellow-600'}`}>
          {calculateAdvancedCOP()}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {calculateAdvancedCOP() > 3 ? 'Sehr gut' : 'Gut'}
        </div>
      </div>

      {/* Leistungsanzeige */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl p-3 shadow-lg border border-gray-200">
        <div className="text-xs text-gray-600 mb-1">Leistung</div>
        <div className="text-lg font-bold text-purple-600">{calculatePower()} kW</div>
      </div>

      {/* Informationsbox - Verbessert */}
      <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-95 rounded-xl p-4 border border-gray-200 shadow-lg">
        <div className="text-sm text-gray-700 text-center">
          <strong>Ihre Ersparnis:</strong> Bis zu €{Math.round(calculateDetailedCosts().monthly * 2.5)} pro Monat gegenüber Gasheizung
        </div>
        <div className="text-xs text-gray-500 text-center mt-1">
          COP: {calculateAdvancedCOP()} | Strom: {Math.round((calculatePower() / calculateAdvancedCOP()) * 100) / 100} kW
        </div>
      </div>
    </div>
  );

  // Experten-Visualisierung mit interaktiven Elementen
  const ExpertsVisualization = () => {
    const [hoveredComponent, setHoveredComponent] = useState(null);
    const [selectedFlow, setSelectedFlow] = useState('refrigerant');
    
    const getRefrigerantState = (position) => {
      switch(position) {
        case 'evaporator': return { temp: outsideTemp - 5, pressure: Math.round(5 + outsideTemp * 0.1), state: 'liquid/gas' };
        case 'compressor': return { temp: Math.round(outsideTemp + 40), pressure: Math.round(25 + (insideTemp - outsideTemp) * 0.5), state: 'superheated gas' };
        case 'condenser': return { temp: insideTemp + 15, pressure: Math.round(25 + (insideTemp - outsideTemp) * 0.5), state: 'gas/liquid' };
        case 'expansion': return { temp: outsideTemp, pressure: Math.round(5 + outsideTemp * 0.1), state: 'liquid' };
        default: return { temp: 0, pressure: 0, state: 'unknown' };
      }
    };

    const getFlowColor = (flowType, position) => {
      if (flowType === 'refrigerant') {
        const state = getRefrigerantState(position);
        if (state.temp > 60) return 'from-red-500 to-orange-500';
        if (state.temp > 30) return 'from-orange-400 to-yellow-400';
        if (state.temp > 0) return 'from-blue-400 to-cyan-400';
        return 'from-blue-600 to-blue-800';
      } else if (flowType === 'electrical') {
        return 'from-yellow-400 to-yellow-600';
      } else if (flowType === 'thermal') {
        return 'from-red-400 to-orange-400';
      }
      return 'from-gray-400 to-gray-600';
    };



    const getFlowSpeed = () => {
      // Flussgeschwindigkeit basierend auf Leistung
      const baseSpeed = Math.max(2, Math.min(8, calculatePower() / 2));
      return baseSpeed;
    };

    return (
      <div className="relative rounded-lg p-4 h-96 overflow-hidden border border-gray-200" style={{background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)'}}>
        {/* Flow-Type Selector */}
        <div className="absolute top-2 right-2 z-10">
          <select 
            value={selectedFlow}
            onChange={(e) => setSelectedFlow(e.target.value)}
            className="text-xs p-2 border rounded"
          >
            <option value="refrigerant">Kältemittel</option>
            <option value="electrical">Strom</option>
            <option value="thermal">Wärme</option>
          </select>
        </div>

        {/* Technisches Schema - Saubere 4x4 Grid Struktur */}
        <div className="expert-grid">
          {/* Zeile 1 */}
          {/* 1,1 - Verdampfer */}
          <div 
            className="expert-component bg-blue-100 border-blue-300 interactive-element tooltip"
            style={{gridColumn: '1', gridRow: '1'}}
            onMouseEnter={() => setHoveredComponent('evaporator')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            <div className="font-bold text-blue-800">Verdampfer</div>
            <div className="text-lg">❄️</div>
            <div className="text-blue-600">{outsideTemp}°C</div>
            <div className="text-blue-600">{humidity}% rH</div>
            
            <div className="pressure-indicator pressure-low">
              <span>L</span>
            </div>
            
            {hoveredComponent === 'evaporator' && (
              <div className="tooltip-content">
                <div>Kältemittel: {getRefrigerantState('evaporator').state}</div>
                <div>Druck: {getRefrigerantState('evaporator').pressure} bar</div>
                <div>Temp: {getRefrigerantState('evaporator').temp}°C</div>
                <div>Wärmeaufnahme: {Math.round(calculatePower() * 0.75)} kW</div>
              </div>
            )}
          </div>

          {/* 1,2 - Rohr horizontal */}
          <div className="expert-pipe" style={{gridColumn: '2', gridRow: '1'}}>
            <div className={`expert-pipe-horizontal bg-gradient-to-r ${getFlowColor(selectedFlow, 'evaporator')}`}>
              <div className="flow-animation flow-animation-horizontal"></div>
            </div>
          </div>

          {/* 1,3 - Verdichter */}
          <div 
            className="expert-component bg-red-100 border-red-300 interactive-element tooltip animate-pulse-glow"
            style={{gridColumn: '3', gridRow: '1'}}
            onMouseEnter={() => setHoveredComponent('compressor')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            <div className="font-bold text-red-800">Verdichter</div>
            <div className="text-lg">⚡</div>
            <div className="text-red-600">{Math.round(calculatePower() / calculateAdvancedCOP())} kW</div>
            
            <div className="pressure-indicator pressure-high">
              <span>H</span>
            </div>
            
            {hoveredComponent === 'compressor' && (
              <div className="tooltip-content">
                <div>Elektrische Leistung: {Math.round(calculatePower() / calculateAdvancedCOP())} kW</div>
                <div>Auslasstemperatur: {getRefrigerantState('compressor').temp}°C</div>
                <div>Druckverhältnis: {Math.round(getRefrigerantState('compressor').pressure / getRefrigerantState('evaporator').pressure * 10) / 10}</div>
              </div>
            )}
          </div>

          {/* 1,4 - Rohr horizontal */}
          <div className="expert-pipe" style={{gridColumn: '4', gridRow: '1'}}>
            <div className={`expert-pipe-horizontal bg-gradient-to-r ${getFlowColor(selectedFlow, 'compressor')}`}>
              <div className="flow-animation flow-animation-horizontal"></div>
            </div>
          </div>

          {/* Zeile 2 */}
          {/* 2,1 - Umgebung */}
          <div className="expert-component bg-green-100 border-green-300" style={{gridColumn: '1', gridRow: '2'}}>
            <div className="font-bold text-green-800">Umgebung</div>
            <div className="text-green-600">Wind: {windSpeed} m/s</div>
            <div className="text-green-600">Saison: {season}</div>
          </div>

          {/* 2,2 - eRELAX Controller */}
          <div className="expert-component bg-indigo-100 border-indigo-300" style={{gridColumn: '2', gridRow: '2'}}>
            <div className="font-bold text-indigo-800">eRELAX</div>
            <div className="text-indigo-600">COP: {calculateAdvancedCOP()}</div>
            <div className="text-indigo-600">Mod: {Math.round(Math.min(100, (calculatePower() / heatingLoad) * 100))}%</div>
          </div>

          {/* 2,3 - Leer */}
          <div style={{gridColumn: '3', gridRow: '2'}}></div>

          {/* 2,4 - Verflüssiger */}
          <div 
            className="expert-component bg-orange-100 border-orange-300 interactive-element tooltip"
            style={{gridColumn: '4', gridRow: '2'}}
            onMouseEnter={() => setHoveredComponent('condenser')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            <div className="font-bold text-orange-800">Verflüssiger</div>
            <div className="text-lg">🔥</div>
            <div className="text-orange-600">{insideTemp + 15}°C</div>
            
            <div className="pressure-indicator pressure-high">
              <span>H</span>
            </div>
            
            {hoveredComponent === 'condenser' && (
              <div className="tooltip-content">
                <div>Kältemittel: {getRefrigerantState('condenser').state}</div>
                <div>Wärmeabgabe: {calculatePower()} kW</div>
                <div>Vorlauftemperatur: {insideTemp + 15}°C</div>
              </div>
            )}
          </div>

          {/* Zeile 3 */}
          {/* 3,1 - Rohr vertikal */}
          <div className="expert-pipe" style={{gridColumn: '1', gridRow: '3'}}>
            <div className={`expert-pipe-vertical bg-gradient-to-t ${getFlowColor(selectedFlow, 'expansion')}`}>
              <div className="flow-animation flow-animation-vertical"></div>
            </div>
          </div>

          {/* 3,2 - PV System */}
          <div className={`expert-component ${pvSystem ? 'bg-yellow-100 border-yellow-300' : 'bg-gray-100 border-gray-300'}`} style={{gridColumn: '2', gridRow: '3'}}>
            <div className="font-bold text-yellow-800">PV-System</div>
            <div className="text-yellow-600">
              {pvSystem ? `${Math.round(calculatePower() * 0.7)} kWp` : 'Inaktiv'}
            </div>
          </div>

          {/* 3,3 - Leer */}
          <div style={{gridColumn: '3', gridRow: '3'}}></div>

          {/* 3,4 - Rohr vertikal */}
          <div className="expert-pipe" style={{gridColumn: '4', gridRow: '3'}}>
            <div className={`expert-pipe-vertical bg-gradient-to-b ${getFlowColor(selectedFlow, 'condenser')}`}>
              <div className="flow-animation flow-animation-vertical"></div>
            </div>
          </div>

          {/* Zeile 4 */}
          {/* 4,1 - Leer */}
          <div style={{gridColumn: '1', gridRow: '4'}}></div>

          {/* 4,2 - Rohr horizontal */}
          <div className="expert-pipe" style={{gridColumn: '2', gridRow: '4'}}>
            <div className={`expert-pipe-horizontal bg-gradient-to-l ${getFlowColor(selectedFlow, 'expansion')}`}>
              <div className="flow-animation flow-animation-horizontal" style={{animationDirection: 'reverse'}}></div>
            </div>
          </div>

          {/* 4,3 - Rohr horizontal */}
          <div className="expert-pipe" style={{gridColumn: '3', gridRow: '4'}}>
            <div className={`expert-pipe-horizontal bg-gradient-to-l ${getFlowColor(selectedFlow, 'expansion')}`}>
              <div className="flow-animation flow-animation-horizontal" style={{animationDirection: 'reverse'}}></div>
            </div>
          </div>

          {/* 4,4 - Expansionsventil */}
          <div 
            className="expert-component bg-purple-100 border-purple-300 interactive-element tooltip"
            style={{gridColumn: '4', gridRow: '4'}}
            onMouseEnter={() => setHoveredComponent('expansion')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            <div className="font-bold text-purple-800">TEV</div>
            <div className="text-sm">🔧</div>
            <div className="text-purple-600">Δp</div>
            
            {hoveredComponent === 'expansion' && (
              <div className="tooltip-content">
                <div>Thermisches Expansionsventil</div>
                <div>Druckreduzierung: {getRefrigerantState('compressor').pressure - getRefrigerantState('expansion').pressure} bar</div>
                <div>Überhitzung: {Math.round(Math.max(3, (outsideTemp + 5) - outsideTemp))}K</div>
              </div>
            )}
          </div>
        </div>

        {/* Legende und p-h Diagramm */}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-95 rounded p-3 text-xs">
          <div className="font-bold mb-2">Kältekreislauf R32:</div>
          <div className="flex gap-4 mb-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full pressure-high"></div>
              <span>HD: {getRefrigerantState('compressor').pressure}bar</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full pressure-low"></div>
              <span>ND: {getRefrigerantState('evaporator').pressure}bar</span>
            </div>
          </div>
          
          {hoveredComponent && (
            <div className="border-t pt-2 mt-2">
              <div className="font-bold">{hoveredComponent} Details:</div>
              {hoveredComponent === 'evaporator' && (
                <div>
                  <div>Verdampfung bei {getRefrigerantState('evaporator').temp}°C</div>
                  <div>Überhitzung: {Math.max(3, outsideTemp - getRefrigerantState('evaporator').temp)}K</div>
                </div>
              )}
              {hoveredComponent === 'compressor' && (
                <div>
                  <div>Isentrope Verdichtung</div>
                  <div>Isentroper Wirkungsgrad: {Math.round(85 + Math.random() * 10)}%</div>
                </div>
              )}
              {hoveredComponent === 'condenser' && (
                <div>
                  <div>Verflüssigung bei {getRefrigerantState('condenser').temp}°C</div>
                  <div>Unterkühlung: {Math.max(2, getRefrigerantState('condenser').temp - insideTemp)}K</div>
                </div>
              )}
              {hoveredComponent === 'expansion' && (
                <div>
                  <div>Isenthalpe Expansion</div>
                  <div>Druckabfall: {getRefrigerantState('compressor').pressure - getRefrigerantState('expansion').pressure} bar</div>
                </div>
              )}
            </div>
          )}
          
          {/* Mini p-h Diagramm */}
          {selectedFlow === 'refrigerant' && (
            <div className="border-t pt-2 mt-2">
              <div className="font-bold mb-1">p-h Diagramm (vereinfacht):</div>
              <div className="w-20 h-16 bg-gray-100 border rounded relative overflow-hidden">
                {/* Achsen */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gray-400"></div>
                <div className="absolute bottom-0 left-0 w-px h-full bg-gray-400"></div>
                
                {/* Kreisprozess-Punkte */}
                <div className="absolute w-1 h-1 bg-blue-500 rounded-full" 
                     style={{left: '10%', bottom: '20%'}} title="1: Verdampfer"></div>
                <div className="absolute w-1 h-1 bg-red-500 rounded-full" 
                     style={{left: '15%', bottom: '70%'}} title="2: Verdichter"></div>
                <div className="absolute w-1 h-1 bg-orange-500 rounded-full" 
                     style={{left: '70%', bottom: '70%'}} title="3: Verflüssiger"></div>
                <div className="absolute w-1 h-1 bg-purple-500 rounded-full" 
                     style={{left: '70%', bottom: '20%'}} title="4: Expansion"></div>
                
                {/* Verbindungslinien */}
                <svg className="absolute inset-0 w-full h-full">
                  <path d="M 2 13 Q 3 11 3 11" stroke="blue" strokeWidth="0.5" fill="none"/>
                  <path d="M 3 11 L 14 11" stroke="red" strokeWidth="0.5" fill="none"/>
                  <path d="M 14 11 Q 14 13 14 13" stroke="orange" strokeWidth="0.5" fill="none"/>
                  <path d="M 14 13 L 2 13" stroke="purple" strokeWidth="0.5" fill="none"/>
                </svg>
                
                <div className="absolute -bottom-5 left-0 text-xs">h</div>
                <div className="absolute -left-2 top-0 text-xs">p</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Parameter-Komponenten basierend auf Zielgruppe - Verbesserte Version
  const renderParameters = () => {
    const content = getAudienceContent();
    
    return (
      <div className="space-y-6">
        {/* Grundparameter für alle */}
        {content.parameters.includes('outsideTemp') && (
          <div className="parameter-card animate-slide-in">
            <label className="flex items-center gap-2 mb-3">
              <Snowflake className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-800">
                {targetAudience === 'kids' ? 'Temperatur draußen' : 'Außentemperatur'}
              </span>
              <span className="value-display">{outsideTemp}°C</span>
            </label>
            <div className="range-container">
              <input
                type="range"
                min="-20"
                max="35"
                value={outsideTemp}
                onChange={(e) => setOutsideTemp(Number(e.target.value))}
                className="w-full"
              />
              <div className="range-labels">
                <span>-20°C</span>
                <span>35°C</span>
              </div>
            </div>
          </div>
        )}

        {content.parameters.includes('insideTemp') && (
          <div className="parameter-card animate-slide-in">
            <label className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-gray-800">
                {targetAudience === 'kids' ? 'Temperatur drinnen' : 'Wunschtemperatur'}
              </span>
              <span className="value-display">{insideTemp}°C</span>
            </label>
            <div className="range-container">
              <input
                type="range"
                min="18"
                max="24"
                value={insideTemp}
                onChange={(e) => setInsideTemp(Number(e.target.value))}
                className="w-full"
              />
              <div className="range-labels">
                <span>18°C</span>
                <span>24°C</span>
              </div>
            </div>
          </div>
        )}

        {/* Erweiterte Parameter für Erwachsene */}
        {content.parameters.includes('heatPumpModel') && (
          <div className="parameter-card animate-slide-in">
            <label className="flex items-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-indigo-500" />
              <span className="font-semibold text-gray-800">Vaillant Modell</span>
            </label>
            <select 
              value={heatPumpModel} 
              onChange={(e) => setHeatPumpModel(e.target.value)}
              className="w-full"
            >
              <option value="aroTHERM">aroTHERM plus (Luft-Wasser)</option>
              <option value="geoTHERM">geoTHERM (Sole-Wasser)</option>
              <option value="flexoTHERM">flexoTHERM exclusive (Hybrid)</option>
            </select>
          </div>
        )}

        {content.parameters.includes('houseSize') && (
          <div className="parameter-card animate-slide-in">
            <label className="flex items-center gap-2 mb-3">
              <Home className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-800">Wohnfläche</span>
              <span className="value-display">{houseSize}m²</span>
            </label>
            <div className="range-container">
              <input
                type="range"
                min="80"
                max="300"
                value={houseSize}
                onChange={(e) => setHouseSize(Number(e.target.value))}
                className="w-full"
              />
              <div className="range-labels">
                <span>80m²</span>
                <span>300m²</span>
              </div>
            </div>
          </div>
        )}

        {content.parameters.includes('electricityPrice') && (
          <div className="parameter-card animate-slide-in">
            <label className="flex items-center gap-2 mb-3">
              <Euro className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-800">Strompreis</span>
              <span className="value-display">€{electricityPrice}/kWh</span>
            </label>
            <div className="range-container">
              <input
                type="range"
                min="0.20"
                max="0.50"
                step="0.01"
                value={electricityPrice}
                onChange={(e) => setElectricityPrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="range-labels">
                <span>€0.20</span>
                <span>€0.50</span>
              </div>
            </div>
          </div>
        )}

        {/* Experten-Parameter */}
        {content.parameters.includes('humidity') && (
          <div className="parameter-card animate-slide-in">
            <label className="flex items-center gap-2 mb-3">
              <Droplets className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-800">Luftfeuchtigkeit</span>
              <span className="value-display">{humidity}%</span>
            </label>
            <div className="range-container">
              <input
                type="range"
                min="30"
                max="90"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full"
              />
              <div className="range-labels">
                <span>30%</span>
                <span>90%</span>
              </div>
            </div>
          </div>
        )}

        {content.parameters.includes('windSpeed') && (
          <div className="parameter-card animate-slide-in">
            <label className="flex items-center gap-2 mb-3">
              <Wind className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-gray-800">Windgeschwindigkeit</span>
              <span className="value-display">{windSpeed} m/s</span>
            </label>
            <div className="range-container">
              <input
                type="range"
                min="0"
                max="10"
                value={windSpeed}
                onChange={(e) => setWindSpeed(Number(e.target.value))}
                className="w-full"
              />
              <div className="range-labels">
                <span>0 m/s</span>
                <span>10 m/s</span>
              </div>
            </div>
          </div>
        )}

        {content.parameters.includes('heatingLoad') && (
          <div className="parameter-card animate-slide-in">
            <label className="flex items-center gap-2 mb-3">
              <Gauge className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-gray-800">Heizlast</span>
              <span className="value-display">{heatingLoad} kW</span>
            </label>
            <div className="range-container">
              <input
                type="range"
                min="4"
                max="20"
                value={heatingLoad}
                onChange={(e) => setHeatingLoad(Number(e.target.value))}
                className="w-full"
              />
              <div className="range-labels">
                <span>4 kW</span>
                <span>20 kW</span>
              </div>
            </div>
          </div>
        )}

        {content.parameters.includes('season') && (
          <div className="parameter-card animate-slide-in">
            <label className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-purple-500" />
              <span className="font-semibold text-gray-800">Jahreszeit</span>
            </label>
            <select 
              value={season} 
              onChange={(e) => setSeason(e.target.value)}
              className="w-full"
            >
              <option value="winter">Winter</option>
              <option value="spring">Frühling</option>
              <option value="summer">Sommer</option>
              <option value="autumn">Herbst</option>
            </select>
          </div>
        )}

        {content.parameters.includes('operatingMode') && (
          <div className="parameter-card animate-slide-in">
            <label className="flex items-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-indigo-500" />
              <span className="font-semibold text-gray-800">Betriebsmodus</span>
            </label>
            <select 
              value={operatingMode} 
              onChange={(e) => setOperatingMode(e.target.value)}
              className="w-full"
            >
              <option value="heating">Heizen</option>
              <option value="cooling">Kühlen</option>
              <option value="dhw">Warmwasser</option>
              <option value="auto">Automatik</option>
            </select>
          </div>
        )}

        {/* PV-System für alle außer Kinder-Modus */}
        {content.parameters.includes('pvSystem') && (
          <div className="parameter-card animate-slide-in">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-800">
                  {targetAudience === 'kids' ? 'Solar-Power' : 'PV-Anlage'}
                </span>
              </label>
              <div 
                className={`toggle-switch ${pvSystem ? 'active' : ''}`}
                onClick={() => setPvSystem(!pvSystem)}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  // KPI-Anzeigen basierend auf Zielgruppe
  const renderKPIs = () => {
    const content = getAudienceContent();
    const costs = calculateDetailedCosts();
    
    return (
      <div className="space-y-4">
        {/* Einfache KPIs für Kinder */}
        {content.kpis.includes('simple') && (
          <>
            <div className="kpi-card card-success animate-fade-in">
              <h3 className="text-xl font-bold text-green-600 mb-6 flex items-center gap-3">
                🌟 Super-Werte!
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                  <div className="text-3xl font-bold text-green-800 mb-2">{calculateAdvancedCOP()}</div>
                  <div className="text-sm text-green-600 font-medium">So gut arbeite ich!</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors">
                  <div className="text-3xl font-bold text-blue-800 mb-2">€{costs.daily}</div>
                  <div className="text-sm text-blue-600 font-medium">Kosten pro Tag</div>
                </div>
                {pvSystem && (
                  <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 hover:bg-yellow-100 transition-colors">
                    <div className="text-3xl mb-2">🌱</div>
                    <div className="text-sm text-yellow-600 font-medium">Umweltfreundlich!</div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Standard KPIs für Erwachsene */}
        {content.kpis.includes('efficiency') && (
          <div className="kpi-card card-primary animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-500" />
              Effizienz
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">COP-Wert</span>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    calculateAdvancedCOP() > 3.5 ? 'bg-green-500 text-white' : 
                    calculateAdvancedCOP() > 2.5 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {calculateAdvancedCOP()}
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-800">{calculateAdvancedCOP()}</div>
                <div className="text-xs text-green-600 mt-1">
                  {calculateAdvancedCOP() > 3.5 ? 'Sehr gut' : 
                   calculateAdvancedCOP() > 2.5 ? 'Gut' : 'Verbesserungswürdig'}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Heizleistung</span>
                </div>
                <div className="text-2xl font-bold text-blue-800">{calculatePower()} kW</div>
                <div className="text-xs text-blue-600 mt-1">Aktuelle Leistung</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Stromverbrauch</span>
                </div>
                <div className="text-2xl font-bold text-orange-800">{Math.round((calculatePower() / calculateAdvancedCOP()) * 100) / 100} kW</div>
                <div className="text-xs text-orange-600 mt-1">Elektrische Leistung</div>
              </div>
            </div>
          </div>
        )}

        {content.kpis.includes('costs') && (
          <div className="kpi-card card-success animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Euro className="w-6 h-6 text-green-600" />
              Wirtschaftlichkeit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="text-sm font-medium text-gray-600 mb-2">Tägl. Betriebskosten</div>
                <div className="text-2xl font-bold text-green-800">€{costs.daily}</div>
                <div className="text-xs text-green-600 mt-1">Pro Tag</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="text-sm font-medium text-gray-600 mb-2">Monatlich</div>
                <div className="text-2xl font-bold text-blue-800">€{costs.monthly}</div>
                <div className="text-xs text-blue-600 mt-1">30 Tage</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="text-sm font-medium text-gray-600 mb-2">Jährlich</div>
                <div className="text-2xl font-bold text-purple-800">€{costs.yearly}</div>
                <div className="text-xs text-purple-600 mt-1">365 Tage</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-700">Ersparnis vs. Gas</span>
                  <span className="font-bold text-green-800">€{Math.round(costs.monthly * 1.8)} /Monat</span>
                </div>
              </div>
              {pvSystem && (
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-yellow-700">Mit PV-Anlage</span>
                    <span className="font-bold text-yellow-800">-70% Stromkosten</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {content.kpis.includes('environment') && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-500" />
              Umweltbilanz
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CO₂ täglich</span>
                <span className="font-bold text-green-600">{calculateCO2()} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CO₂ jährlich</span>
                <span className="font-bold text-green-600">{Math.round(calculateCO2() * 365)} kg</span>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Einsparung vs. Gas</span>
                  <span className="font-bold text-green-800">{Math.round(calculateCO2() * 365 * 3.2)} kg/Jahr</span>
                </div>
              </div>
              {pvSystem && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <span className="text-sm text-blue-700">🌱 Mit Solarstrom: Nahezu CO₂-neutral!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Erweiterte KPIs für Experten */}
        {content.kpis.includes('advanced_efficiency') && (
          <div className="kpi-card card-primary animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Gauge className="w-6 h-6 text-blue-500" />
              Erweiterte Effizienz-Analyse
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="text-sm text-blue-600 mb-2 font-medium">COP (aktuell)</div>
                <div className="text-2xl font-bold text-blue-800">{calculateAdvancedCOP()}</div>
                <div className="text-xs text-blue-600 mt-1">Coefficient of Performance</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="text-sm text-purple-600 mb-2 font-medium">JAZ (geschätzt)</div>
                <div className="text-2xl font-bold text-purple-800">{(calculateAdvancedCOP() * 0.85).toFixed(1)}</div>
                <div className="text-xs text-purple-600 mt-1">Jahresarbeitszahl</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="text-sm text-green-600 mb-2 font-medium">Carnot-Effizienz</div>
                <div className="text-2xl font-bold text-green-800">{Math.round(calculateAdvancedCOP() / 6 * 100)}%</div>
                <div className="text-xs text-green-600 mt-1">Theoretisches Maximum</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                <div className="text-sm text-orange-600 mb-2 font-medium">Modulationsgrad</div>
                <div className="text-2xl font-bold text-orange-800">{Math.round(Math.min(100, (calculatePower() / heatingLoad) * 100))}%</div>
                <div className="text-xs text-orange-600 mt-1">Aktuelle Auslastung</div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="text-sm font-medium text-gray-700 mb-3">Einflussfaktoren:</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Temperaturhub:</span>
                  <span className="font-semibold">{Math.abs(outsideTemp - insideTemp)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Luftfeuchtigkeit:</span>
                  <span className="font-semibold">{humidity}% rH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Windeinfluss:</span>
                  <span className="font-semibold text-green-600">+{Math.round((windSpeed * 2))}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Abtauverluste:</span>
                  <span className="font-semibold text-red-600">-{Math.round(Math.max(0, (5 - outsideTemp) * 2))}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {content.kpis.includes('detailed_costs') && (
          <div className="kpi-card card-success animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-green-500" />
              Detaillierte Kostenanalyse
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="text-sm text-blue-600 mb-2 font-medium">Wärmebedarf</div>
                  <div className="text-2xl font-bold text-blue-800">{calculatePower()} kW</div>
                  <div className="text-xs text-blue-600 mt-1">Heizleistung</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <div className="text-sm text-orange-600 mb-2 font-medium">Strombedarf</div>
                  <div className="text-2xl font-bold text-orange-800">{Math.round((calculatePower() / calculateAdvancedCOP()) * 100) / 100} kW</div>
                  <div className="text-xs text-orange-600 mt-1">Elektrische Leistung</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="text-sm font-medium text-gray-700 mb-3">Kostenaufschlüsselung:</div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Grundpreis Strom (tägl.)</span>
                    <span className="font-semibold">€{(0.35).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Verbrauchskosten</span>
                    <span className="font-semibold">€{(costs.daily - 0.35).toFixed(2)}</span>
                  </div>
                  {pvSystem && (
                    <>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>PV-Eigenverbrauch (-70%)</span>
                        <span className="font-semibold">-€{((costs.daily - 0.35) * 0.7).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Einspeisevergütung</span>
                        <span className="font-semibold">+€{(0.08 * calculatePower() * 0.3).toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  <hr className="my-3" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Gesamt täglich</span>
                    <span>€{costs.daily}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <div className="text-sm font-medium text-yellow-700 mb-3">Vergleich Heizsysteme (jährlich):</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">🔥 Gasheizung (80% Effizienz)</span>
                    <span className="font-semibold text-red-600">€{Math.round(costs.yearly * 2.2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">🛢️ Ölheizung (75% Effizienz)</span>
                    <span className="font-semibold text-red-600">€{Math.round(costs.yearly * 2.5)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>⚡ Wärmepumpe</span>
                    <span className="text-green-600">€{costs.yearly}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {content.kpis.includes('environmental_analysis') && (
          <div className="kpi-card card-success animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Leaf className="w-6 h-6 text-green-500" />
              Umwelt-Impact-Analyse
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="text-sm text-green-600 mb-2 font-medium">CO₂-Faktor Strom</div>
                  <div className="text-2xl font-bold text-green-800">{pvSystem ? '0.05' : '0.40'} kg/kWh</div>
                  <div className="text-xs text-green-600 mt-1">{pvSystem ? 'Mit PV' : 'Strommix'}</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="text-sm text-blue-600 mb-2 font-medium">Primärenergiefaktor</div>
                  <div className="text-2xl font-bold text-blue-800">{pvSystem ? '0.2' : '1.8'}</div>
                  <div className="text-xs text-blue-600 mt-1">Energieeffizienz</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="text-sm font-medium text-gray-700 mb-3">Jährliche CO₂-Bilanz:</div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Wärmepumpe (aktuell)</span>
                    <span className="font-semibold text-green-600">{Math.round(calculateCO2() * 365)} kg CO₂</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gasheizung (Vergleich)</span>
                    <span className="font-semibold text-red-600">{Math.round(calculateCO2() * 365 * 4.2)} kg CO₂</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ölheizung (Vergleich)</span>
                    <span className="font-semibold text-red-600">{Math.round(calculateCO2() * 365 * 4.8)} kg CO₂</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between font-bold text-lg text-green-600">
                    <span>Einsparung vs. Gas</span>
                    <span>-{Math.round(calculateCO2() * 365 * 3.2)} kg CO₂</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="text-sm font-medium text-blue-700 mb-3">Kältemittel (R32):</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">GWP-Wert:</span>
                    <span className="font-semibold">675 (niedrig)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Füllmenge:</span>
                    <span className="font-semibold">~{Math.round(calculatePower() * 0.15)} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CO₂-Äquivalent:</span>
                    <span className="font-semibold">{Math.round(calculatePower() * 0.15 * 675 / 1000)} t</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {content.kpis.includes('performance_metrics') && (
          <div className="kpi-card card-info animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-purple-500" />
              Performance-Metriken
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="text-sm text-purple-600 mb-2 font-medium">SCOP (Seasonal)</div>
                  <div className="text-2xl font-bold text-purple-800">{(calculateAdvancedCOP() * 0.82).toFixed(1)}</div>
                  <div className="text-xs text-purple-600 mt-1">A+++ Effizienz</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
                  <div className="text-sm text-indigo-600 mb-2 font-medium">Schallpegel</div>
                  <div className="text-2xl font-bold text-indigo-800">{Math.round(35 + calculatePower())} dB(A)</div>
                  <div className="text-xs text-indigo-600 mt-1">@ 3m Abstand</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="text-sm font-medium text-gray-700 mb-3">Betriebsgrenzen:</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min. Außentemp.:</span>
                    <span className="font-semibold">-20°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max. Außentemp.:</span>
                    <span className="font-semibold">+35°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min. Vorlauftemp.:</span>
                    <span className="font-semibold">25°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max. Vorlauftemp.:</span>
                    <span className="font-semibold">75°C</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                <div className="text-sm font-medium text-orange-700 mb-3">Optimierungspotential:</div>
                <div className="space-y-2 text-sm">
                  {outsideTemp < 0 && <div className="flex items-center gap-2">
                    <span className="text-orange-600">•</span>
                    <span>Abtauzyklen optimieren</span>
                  </div>}
                  {Math.abs(outsideTemp - insideTemp) > 25 && <div className="flex items-center gap-2">
                    <span className="text-orange-600">•</span>
                    <span>Vorlauftemperatur reduzieren</span>
                  </div>}
                  {!pvSystem && <div className="flex items-center gap-2">
                    <span className="text-orange-600">•</span>
                    <span>PV-Anlage für Eigenverbrauch</span>
                  </div>}
                  {houseSize > 200 && <div className="flex items-center gap-2">
                    <span className="text-orange-600">•</span>
                    <span>Zonierung für Teillastbetrieb</span>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call-to-Action basierend auf Zielgruppe */}
        <div className={`kpi-card animate-fade-in ${
          targetAudience === 'kids' ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
          targetAudience === 'adults' ? 'bg-gradient-to-r from-red-500 to-red-600' :
          'bg-gradient-to-r from-blue-600 to-indigo-700'
        }`}>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-white">
            {targetAudience === 'kids' ? '🎉 Super cool!' : 
             targetAudience === 'adults' ? '💡 Überzeugt?' :
             '🎯 Interesse geweckt?'}
          </h3>
          <p className="text-base mb-6 opacity-90 text-white">
            {targetAudience === 'kids' ? 'Erzähl deinen Eltern von der tollen Wärmepumpe!' :
             targetAudience === 'adults' ? 'Lassen Sie sich unverbindlich von einem Vaillant Partner beraten!' :
             'Detaillierte Systemauslegung durch zertifizierte Vaillant Fachpartner.'}
          </p>
          <button className="btn-modern w-full bg-white">
            <span className={`${
              targetAudience === 'kids' ? 'text-purple-600' :
              targetAudience === 'adults' ? 'text-red-600' :
              'text-blue-600'
            }`}>
              {targetAudience === 'kids' ? '👨‍👩‍👧‍👦 Eltern informieren' :
               targetAudience === 'adults' ? '📞 Kostenlose Beratung anfragen' :
               '🔬 Fachberatung & Systemauslegung'}
            </span>
          </button>
        </div>
      </div>
    );
  };

  const content = getAudienceContent();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header wie EnergieExpert */}
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/images/vaillant-logo.png" alt="Vaillant" className="h-8" />
              <span className="text-white font-semibold text-lg">Vaillant WärmepumpenExpert</span>
            </div>
          
            {/* Navigation Tabs wie EnergieExpert */}
            <div className="flex space-x-2">
              <button 
                onClick={() => setTargetAudience('adults')}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  targetAudience === 'adults' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Haushalt
              </button>
              <button 
                onClick={() => setTargetAudience('kids')}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  targetAudience === 'kids' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Kinder
              </button>
              <button 
                onClick={() => setTargetAudience('experts')}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  targetAudience === 'experts' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Experten
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content wie EnergieExpert */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              {targetAudience === 'kids' ? 'Wärmepumpe für kleine Entdecker' :
               targetAudience === 'adults' ? 'Wärmepumpe verstehen & optimieren' :
               'Wärmepumpen-Systemanalyse'}
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {targetAudience === 'kids' ? 'Entdecke, wie die magische Wärmepumpe funktioniert und dein Zuhause warm hält!' :
               targetAudience === 'adults' ? 'Verstehen Sie, wie Vaillant Wärmepumpen funktionieren und optimieren Sie Ihre Heizkosten.' :
               'Detaillierte Analyse und Visualisierung Ihres Vaillant Wärmepumpen-Systems mit allen technischen Parametern.'}
            </p>
          </div>
          {/* Content Grid wie EnergieExpert */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Control Panel - Verbesserte Version */}
            <div className="card-modern card-primary animate-slide-in">
              <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <Settings className="w-6 h-6 text-indigo-500" />
                {targetAudience === 'kids' ? 'Spiel-Regler' :
                 targetAudience === 'adults' ? 'Einstellungen' :
                 'System-Parameter'}
              </h3>
              
              {renderParameters()}
            </div>

            {/* Main Visualization - Verbesserte Version */}
            <div className="lg:col-span-2 card-modern card-info animate-slide-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {targetAudience === 'kids' ? '🔮 Wie es funktioniert' :
                   targetAudience === 'adults' ? 'Funktionsweise' :
                   'System-Schaltbild'}
                </h3>
              </div>
              
              {targetAudience === 'kids' && <KidsVisualization />}
              {targetAudience === 'adults' && <AdultsVisualization />}
              {targetAudience === 'experts' && <ExpertsVisualization />}
            </div>
          </div>

          {/* KPI Cards Row */}
          <div className="mt-6">
            {renderKPIs()}
          </div>
        </div>
      </div>

      {/* Zusätzliche Informationen für Experten */}
      {targetAudience === 'experts' && (
        <div className="max-w-7xl mx-auto mt-6 space-y-6">
          {/* Technische Spezifikationen */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-500" />
              Technische Spezifikationen & Normen
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-bold text-gray-700 mb-2">Prüfnormen</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• EN 14511 (COP/SCOP Prüfung)</li>
                  <li>• EN 12102 (Schall-Prüfung)</li>
                  <li>• ErP-Richtlinie 2009/125/EG</li>
                  <li>• F-Gase-Verordnung 517/2014</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 mb-2">Betriebsdaten</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Vorlauftemperatur: max. 75°C</li>
                  <li>• Betriebsdruck: max. 42 bar</li>
                  <li>• Abtauung: bedarfsgeregelt</li>
                  <li>• Modulation: 25-100%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 mb-2">Intelligente Features</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• SG Ready Interface</li>
                  <li>• PV-Integration möglich</li>
                  <li>• Predictive Control</li>
                  <li>• Remote Monitoring</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Erweiterte Systemanalyse */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Energieflussdiagramm */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Energiefluss-Analyse
              </h3>
              <div className="space-y-4">
                {/* Sankey-ähnliches Diagramm */}
                <div className="relative h-32 bg-gray-50 rounded border">
                  <div className="absolute left-4 top-4 text-xs font-bold">Eingänge:</div>
                  <div className="absolute left-4 top-8 text-xs">Strom: {Math.round(calculatePower() / calculateAdvancedCOP())} kW</div>
                  <div className="absolute left-4 top-12 text-xs">Umwelt: {Math.round(calculatePower() * 0.75)} kW</div>
                  
                  {/* Energiefluss-Balken */}
                  <div className="absolute left-24 top-8 w-16 h-2 bg-yellow-400 rounded"></div>
                  <div className="absolute left-24 top-12 w-20 h-2 bg-blue-400 rounded"></div>
                  
                  {/* Wärmepumpe */}
                  <div className="absolute left-48 top-6 w-12 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">WP</div>
                  
                  {/* Ausgang */}
                  <div className="absolute left-64 top-8 w-20 h-3 bg-red-400 rounded"></div>
                  <div className="absolute right-4 top-4 text-xs font-bold">Wärmeabgabe:</div>
                  <div className="absolute right-4 top-8 text-xs">{calculatePower()} kW</div>
                  
                  {/* Effizienz-Anzeige */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-xs text-gray-600">Effizienz: {Math.round(calculateAdvancedCOP() * 100 / 6)}%</div>
                    <div className="text-sm font-bold text-green-600">COP: {calculateAdvancedCOP()}</div>
                  </div>
                </div>

                {/* Verluste */}
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm font-bold text-gray-700 mb-2">Systemverluste:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Verdichter: {Math.round((calculatePower() / calculateAdvancedCOP()) * 0.15)} kW</div>
                    <div>Rohrleitungen: {Math.round(calculatePower() * 0.05)} kW</div>
                    <div>Abtauung: {Math.round(Math.max(0, (5 - outsideTemp) * calculatePower() * 0.02))} kW</div>
                    <div>Hilfstrom: {Math.round(calculatePower() * 0.03)} kW</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regelungsoptimierung */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-500" />
                Intelligente Regelung
              </h3>
              <div className="space-y-4">
                {/* Regelkaskade */}
                <div className="bg-purple-50 p-3 rounded">
                  <div className="text-sm font-bold text-purple-800 mb-2">Regelkaskade eRELAX:</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Außentemperatur-geführt</span>
                      <span className={outsideTemp < 0 ? 'text-red-600' : 'text-green-600'}>
                        {outsideTemp < 0 ? 'Aktiv' : 'Standby'}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Raumtemperatur-geführt</span>
                      <span className="text-green-600">Aktiv</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Vorlauftemperatur-geführt</span>
                      <span className="text-green-600">Aktiv</span>
                    </div>
                  </div>
                </div>

                {/* Smart Features */}
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-sm font-bold text-blue-800 mb-2">Smart Grid Ready:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span>SG0: Normalbetrieb</span>
                      <div className={`w-3 h-3 rounded-full ${!pvSystem ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                    </div>
                    <div className="flex justify-between">
                      <span>SG1: Einschränkung</span>
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex justify-between">
                      <span>SG2: Anregung</span>
                      <div className={`w-3 h-3 rounded-full ${pvSystem ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                    </div>
                    <div className="flex justify-between">
                      <span>SG3: Zwangsein</span>
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                </div>

                {/* Predictive Control */}
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-sm font-bold text-green-800 mb-2">Predictive Control:</div>
                  <div className="text-xs space-y-1">
                    <div>Wettervorhersage: 48h Integration</div>
                    <div>Bedarfsprognose: Lernalgorithmus</div>
                    <div>PV-Ertragsprognose: {pvSystem ? 'Aktiv' : 'Inaktiv'}</div>
                    <div>Strompreissignal: {Math.round(electricityPrice * 100)}ct/kWh</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wartung und Monitoring */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
              Wartung & Monitoring
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-bold text-gray-700 mb-2">Wartungsintervalle</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Filter Außeneinheit</span>
                    <span className="text-green-600">OK</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kältemitteldruck</span>
                    <span className="text-green-600">OK</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verdampfer-Abtauung</span>
                    <span className={outsideTemp < 2 ? 'text-yellow-600' : 'text-green-600'}>
                      {outsideTemp < 2 ? 'Überwachen' : 'OK'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wasserdruck System</span>
                    <span className="text-green-600">2.1 bar</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-700 mb-2">Remote Monitoring</h4>
                <div className="space-y-2 text-sm">
                  <div>• Betriebsstunden: {Math.round(houseSize * 20)} h</div>
                  <div>• Schaltzyklen: {Math.round(calculatePower() * 100)} </div>
                  <div>• Durchschn. COP: {(calculateAdvancedCOP() * 0.95).toFixed(1)}</div>
                  <div>• Letzte Wartung: 45 Tage</div>
                  <div>• Status: 
                    <span className="ml-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      Optimal
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-700 mb-2">Alarm & Diagnose</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-green-50 rounded text-green-700">
                    ✓ Alle Systeme funktional
                  </div>
                  {outsideTemp < -15 && (
                    <div className="p-2 bg-yellow-50 rounded text-yellow-700">
                      ⚠ Abtauzyklen häufiger
                    </div>
                  )}
                  {Math.abs(outsideTemp - insideTemp) > 30 && (
                    <div className="p-2 bg-orange-50 rounded text-orange-700">
                      ⚠ Hoher Temperaturhub
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-2">
                    Nächste Inspektion: in {90 - 45} Tagen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaillantHeatPumpVisualizer;