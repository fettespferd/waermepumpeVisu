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

  // Kinder-Visualisierung - Verbessert für dunkles Theme
  const KidsVisualization = () => (
    <div className="relative rounded-2xl p-6 h-96 overflow-hidden border border-gray-200" style={{background: 'linear-gradient(to bottom, #a78bfa, #c4b5fd, #f472b6)'}}>
      {/* Sonne */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400 rounded-full animate-pulse shadow-lg">
        <div className="absolute inset-2 bg-yellow-300 rounded-full flex items-center justify-center">
          ☀️
        </div>
      </div>
      
      {/* Großes Haus */}
      <div className="absolute bottom-6 right-6 w-32 h-24 bg-white rounded-xl border-4 border-pink-400 shadow-xl">
        <div className="w-full h-4 bg-red-500 rounded-t-lg"></div>
        <div className="p-3 text-center">
          <div className="text-2xl mb-1">🏠</div>
          <div className="text-lg font-bold text-gray-800">{insideTemp}°C</div>
          <div className="text-xs text-pink-600 font-bold">Warm & gemütlich!</div>
        </div>
      </div>

      {/* Wärmepumpe als freundlicher Roboter */}
      <div className="absolute bottom-6 left-6 w-24 h-20 bg-white rounded-2xl border-4 border-blue-400 shadow-xl">
        <div className="p-2 text-center">
          <div className="text-2xl mb-1">🤖</div>
          <div className="text-xs font-bold text-blue-800">Wärme-Helfer</div>
        </div>
      </div>

      {/* Animierte Wärme-Herzen */}
      <div className="absolute bottom-16 left-16 w-24 h-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-2xl transition-all duration-1000 drop-shadow-lg ${
              animationPhase >= (i % 4) ? 'opacity-100 translate-x-6' : 'opacity-0'
            }`}
            style={{ left: `${i * 16}px` }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* PV als Solarblumen */}
      {pvSystem && (
        <div className="absolute top-12 right-12">
          <div className="text-3xl animate-bounce drop-shadow-lg">🌻🌻</div>
          <div className="text-xs text-center text-green-800 font-bold bg-white bg-opacity-80 rounded px-2 py-1">Solar-Power!</div>
        </div>
      )}

      {/* Erklärung */}
      <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-95 rounded-xl p-3 text-center shadow-lg border border-gray-300">
        <div className="text-sm font-bold text-purple-800">
          {outsideTemp < 0 ? "Auch bei Kälte finde ich Wärme! ❄️➡️🔥" : 
           outsideTemp < 10 ? "Ich sammle Wärme aus der Luft! 🌬️➡️🏠" :
           "Bei warmen Wetter arbeite ich besonders gut! ☀️➡️😊"}
        </div>
      </div>
    </div>
  );

  // Erwachsenen-Visualisierung
  const AdultsVisualization = () => (
    <div className="relative rounded-xl p-6 h-96 overflow-hidden border-2 border-gray-200" style={{background: 'linear-gradient(to bottom right, #dbeafe, #ffffff, #dcfce7)'}}>
      {/* Haus */}
      <div className="absolute bottom-8 right-8 w-28 h-22 bg-gray-100 rounded-lg border-2 border-gray-300 shadow-lg">
        <div className="w-full h-3 bg-red-600 rounded-t-lg"></div>
        <div className="p-3 text-center">
          <Home className="w-8 h-8 mx-auto text-gray-600 mb-1" />
          <div className="text-sm font-bold text-gray-800">{insideTemp}°C</div>
          <div className="text-xs text-gray-600">{houseSize}m²</div>
        </div>
      </div>

      {/* Wärmepumpe */}
      <div className="absolute bottom-8 left-8 w-24 h-20 bg-red-600 rounded-lg shadow-lg border-2 border-red-700">
        <div className="p-2 text-center text-white">
          <div className="text-lg font-bold">V</div>
          <div className="text-xs">{heatPumpModel}</div>
          <div className="flex justify-center mt-1">
            <div className={`w-2 h-2 rounded-full ${calculateAdvancedCOP() > 3 ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
          </div>
        </div>
      </div>

      {/* Technischer Wärmestrom */}
      <div className="absolute bottom-14 left-20 w-20 h-2 bg-gradient-to-r from-blue-400 to-red-400 rounded-full opacity-75">
        <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
      </div>

      {/* PV-Anlage */}
      {pvSystem && (
        <div className="absolute top-6 right-12 w-20 h-12 bg-blue-900 rounded-md border border-blue-700 shadow-md">
          <div className="grid grid-cols-5 gap-0.5 p-1">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-blue-600 animate-pulse"></div>
            ))}
          </div>
          <div className="text-xs text-center text-white font-medium">Solar</div>
        </div>
      )}

      {/* Außentemperatur-Display */}
      <div className="absolute top-6 left-6 bg-white rounded-lg p-3 shadow-md border">
        <div className="flex items-center gap-2 mb-2">
          <Thermometer className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">Außen</span>
        </div>
        <div className="text-lg font-bold text-blue-600">{outsideTemp}°C</div>
      </div>

      {/* Effizienz-Indikator */}
      <div className="absolute top-20 left-6 bg-white rounded-lg p-2 shadow-md border">
        <div className="text-xs text-gray-600">COP</div>
        <div className={`text-lg font-bold ${calculateAdvancedCOP() > 3 ? 'text-green-600' : 'text-yellow-600'}`}>
          {calculateAdvancedCOP()}
        </div>
      </div>

      {/* Informationsbox */}
      <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-95 rounded-lg p-3 border">
        <div className="text-sm text-gray-700 text-center">
          <strong>Ihre Ersparnis:</strong> Bis zu €{Math.round(calculateDetailedCosts().monthly * 2.5)} pro Monat gegenüber Gasheizung
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

  // Parameter-Komponenten basierend auf Zielgruppe
  const renderParameters = () => {
    const content = getAudienceContent();
    
    return (
      <div className="space-y-4">
        {/* Grundparameter für alle */}
        {content.parameters.includes('outsideTemp') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Snowflake className="w-4 h-4 inline mr-1 text-blue-500" />
              {targetAudience === 'kids' ? 'Temperatur draußen' : 'Außentemperatur'}: {outsideTemp}°C
            </label>
            <input
              type="range"
              min="-20"
              max="35"
              value={outsideTemp}
              onChange={(e) => setOutsideTemp(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>-20°C</span>
              <span>35°C</span>
            </div>
          </div>
        )}

        {content.parameters.includes('insideTemp') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Flame className="w-4 h-4 inline mr-1 text-red-500" />
              {targetAudience === 'kids' ? 'Temperatur drinnen' : 'Wunschtemperatur'}: {insideTemp}°C
            </label>
            <input
              type="range"
              min="18"
              max="24"
              value={insideTemp}
              onChange={(e) => setInsideTemp(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
        )}

        {/* Erweiterte Parameter für Erwachsene */}
        {content.parameters.includes('heatPumpModel') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Vaillant Modell</label>
            <select 
              value={heatPumpModel} 
              onChange={(e) => setHeatPumpModel(e.target.value)}
              className="w-full p-2 rounded-md"
            >
              <option value="aroTHERM">aroTHERM plus (Luft-Wasser)</option>
              <option value="geoTHERM">geoTHERM (Sole-Wasser)</option>
              <option value="flexoTHERM">flexoTHERM exclusive (Hybrid)</option>
            </select>
          </div>
        )}

        {content.parameters.includes('houseSize') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Home className="w-4 h-4 inline mr-1 text-green-400" />
              Wohnfläche: {houseSize}m²
            </label>
            <input
              type="range"
              min="80"
              max="300"
              value={houseSize}
              onChange={(e) => setHouseSize(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
        )}

        {content.parameters.includes('electricityPrice') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Euro className="w-4 h-4 inline mr-1 text-yellow-400" />
              Strompreis: €{electricityPrice}/kWh
            </label>
            <input
              type="range"
              min="0.20"
              max="0.50"
              step="0.01"
              value={electricityPrice}
              onChange={(e) => setElectricityPrice(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
        )}

        {/* Experten-Parameter */}
        {content.parameters.includes('humidity') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Droplets className="w-4 h-4 inline mr-1 text-blue-400" />
              Luftfeuchtigkeit: {humidity}%
            </label>
            <input
              type="range"
              min="30"
              max="90"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
        )}

        {content.parameters.includes('windSpeed') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Wind className="w-4 h-4 inline mr-1 text-gray-400" />
              Windgeschwindigkeit: {windSpeed} m/s
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={windSpeed}
              onChange={(e) => setWindSpeed(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
        )}

        {content.parameters.includes('heatingLoad') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Gauge className="w-4 h-4 inline mr-1 text-red-400" />
              Heizlast: {heatingLoad} kW
            </label>
            <input
              type="range"
              min="4"
              max="20"
              value={heatingLoad}
              onChange={(e) => setHeatingLoad(Number(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
        )}

        {content.parameters.includes('season') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1 text-purple-400" />
              Jahreszeit
            </label>
            <select 
              value={season} 
              onChange={(e) => setSeason(e.target.value)}
              className="w-full p-2 rounded-md"
            >
              <option value="winter">Winter</option>
              <option value="spring">Frühling</option>
              <option value="summer">Sommer</option>
              <option value="autumn">Herbst</option>
            </select>
          </div>
        )}

        {content.parameters.includes('operatingMode') && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Betriebsmodus</label>
            <select 
              value={operatingMode} 
              onChange={(e) => setOperatingMode(e.target.value)}
              className="w-full p-2 rounded-md"
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
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Sun className="w-4 h-4 text-yellow-400" />
              {targetAudience === 'kids' ? 'Solar-Power' : 'PV-Anlage'}
            </span>
            <button
              onClick={() => setPvSystem(!pvSystem)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                pvSystem ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                pvSystem ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
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
            <div className="bg-white rounded-xl p-6 shadow-lg border-4 border-green-200">
              <h3 className="text-lg font-bold text-green-600 mb-4 flex items-center gap-2">
                🌟 Super-Werte!
              </h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">{calculateAdvancedCOP()}</div>
                  <div className="text-sm text-green-600">So gut arbeite ich!</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-800">€{costs.daily}</div>
                  <div className="text-sm text-blue-600">Kosten pro Tag</div>
                </div>
                {pvSystem && (
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="text-2xl">🌱</div>
                    <div className="text-sm text-yellow-600">Umweltfreundlich!</div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Standard KPIs für Erwachsene */}
        {content.kpis.includes('efficiency') && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Effizienz
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">COP-Wert</span>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    calculateAdvancedCOP() > 3.5 ? 'bg-green-100 text-green-800' : 
                    calculateAdvancedCOP() > 2.5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {calculateAdvancedCOP()}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Heizleistung</span>
                <span className="font-bold text-blue-600">{calculatePower()} kW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stromverbrauch</span>
                <span className="font-bold text-orange-600">{Math.round((calculatePower() / calculateAdvancedCOP()) * 100) / 100} kW</span>
              </div>
            </div>
          </div>
        )}

        {content.kpis.includes('costs') && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Euro className="w-5 h-5 text-green-600" />
              Wirtschaftlichkeit
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tägl. Betriebskosten</span>
                <span className="font-bold text-green-600">€{costs.daily}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Monatlich</span>
                <span className="font-bold text-green-600">€{costs.monthly}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Jährlich</span>
                <span className="font-bold text-green-600">€{costs.yearly}</span>
              </div>
              <div className="bg-green-50 p-3 rounded-lg mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Ersparnis vs. Gas</span>
                  <span className="font-bold text-green-800">€{Math.round(costs.monthly * 1.8)} /Monat</span>
                </div>
              </div>
              {pvSystem && (
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-yellow-700">Mit PV-Anlage</span>
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
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-blue-500" />
              Erweiterte Effizienz-Analyse
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">COP (aktuell)</div>
                <div className="text-xl font-bold text-blue-800">{calculateAdvancedCOP()}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-sm text-purple-600 mb-1">JAZ (geschätzt)</div>
                <div className="text-xl font-bold text-purple-800">{(calculateAdvancedCOP() * 0.85).toFixed(1)}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-green-600 mb-1">Carnot-Effizienz</div>
                <div className="text-xl font-bold text-green-800">{Math.round(calculateAdvancedCOP() / 6 * 100)}%</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-sm text-orange-600 mb-1">Modulationsgrad</div>
                <div className="text-xl font-bold text-orange-800">{Math.round(Math.min(100, (calculatePower() / heatingLoad) * 100))}%</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Einflussfaktoren:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Temperaturhub: {Math.abs(outsideTemp - insideTemp)}K</div>
                <div>Luftfeuchtigkeit: {humidity}% rH</div>
                <div>Windeinfluss: +{Math.round((windSpeed * 2))}%</div>
                <div>Abtauverluste: -{Math.round(Math.max(0, (5 - outsideTemp) * 2))}%</div>
              </div>
            </div>
          </div>
        )}

        {content.kpis.includes('detailed_costs') && (
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-green-500" />
              Detaillierte Kostenanalyse
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-600 mb-1">Wärmebedarf</div>
                  <div className="text-lg font-bold text-blue-800">{calculatePower()} kW</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-sm text-orange-600 mb-1">Strombedarf</div>
                  <div className="text-lg font-bold text-orange-800">{Math.round((calculatePower() / calculateAdvancedCOP()) * 100) / 100} kW</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Kostenaufschlüsselung:</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Grundpreis Strom (tägl.)</span>
                    <span>€{(0.35).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Verbrauchskosten</span>
                    <span>€{(costs.daily - 0.35).toFixed(2)}</span>
                  </div>
                  {pvSystem && (
                    <>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>PV-Eigenverbrauch (-70%)</span>
                        <span>-€{((costs.daily - 0.35) * 0.7).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Einspeisevergütung</span>
                        <span>+€{(0.08 * calculatePower() * 0.3).toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Gesamt täglich</span>
                    <span>€{costs.daily}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-sm text-yellow-700 mb-2">Vergleich Heizsysteme (jährlich):</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>🔥 Gasheizung (80% Effizienz)</span>
                    <span className="text-red-600">€{Math.round(costs.yearly * 2.2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🛢️ Ölheizung (75% Effizienz)</span>
                    <span className="text-red-600">€{Math.round(costs.yearly * 2.5)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>⚡ Wärmepumpe</span>
                    <span className="text-green-600">€{costs.yearly}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {content.kpis.includes('environmental_analysis') && (
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-500" />
              Umwelt-Impact-Analyse
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-sm text-green-600 mb-1">CO₂-Faktor Strom</div>
                  <div className="text-lg font-bold text-green-800">{pvSystem ? '0.05' : '0.40'} kg/kWh</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-600 mb-1">Primärenergiefaktor</div>
                  <div className="text-lg font-bold text-blue-800">{pvSystem ? '0.2' : '1.8'}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Jährliche CO₂-Bilanz:</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Wärmepumpe (aktuell)</span>
                    <span className="text-green-600">{Math.round(calculateCO2() * 365)} kg CO₂</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Gasheizung (Vergleich)</span>
                    <span className="text-red-600">{Math.round(calculateCO2() * 365 * 4.2)} kg CO₂</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ölheizung (Vergleich)</span>
                    <span className="text-red-600">{Math.round(calculateCO2() * 365 * 4.8)} kg CO₂</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-green-600">
                    <span>Einsparung vs. Gas</span>
                    <span>-{Math.round(calculateCO2() * 365 * 3.2)} kg CO₂</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-700 mb-2">Kältemittel (R32):</div>
                <div className="space-y-1 text-xs">
                  <div>GWP-Wert: 675 (niedrig)</div>
                  <div>Füllmenge: ~{Math.round(calculatePower() * 0.15)} kg</div>
                  <div>CO₂-Äquivalent: {Math.round(calculatePower() * 0.15 * 675 / 1000)} t</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {content.kpis.includes('performance_metrics') && (
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              Performance-Metriken
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-sm text-purple-600 mb-1">SCOP (Seasonal)</div>
                  <div className="text-lg font-bold text-purple-800">{(calculateAdvancedCOP() * 0.82).toFixed(1)}</div>
                  <div className="text-xs text-purple-600">A+++ Effizienz</div>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <div className="text-sm text-indigo-600 mb-1">Schallpegel</div>
                  <div className="text-lg font-bold text-indigo-800">{Math.round(35 + calculatePower())} dB(A)</div>
                  <div className="text-xs text-indigo-600">@ 3m Abstand</div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Betriebsgrenzen:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Min. Außentemp.: -20°C</div>
                  <div>Max. Außentemp.: +35°C</div>
                  <div>Min. Vorlauftemp.: 25°C</div>
                  <div>Max. Vorlauftemp.: 75°C</div>
                </div>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-sm text-orange-700 mb-2">Optimierungspotential:</div>
                <div className="space-y-1 text-xs">
                  {outsideTemp < 0 && <div>• Abtauzyklen optimieren</div>}
                  {Math.abs(outsideTemp - insideTemp) > 25 && <div>• Vorlauftemperatur reduzieren</div>}
                  {!pvSystem && <div>• PV-Anlage für Eigenverbrauch</div>}
                  {houseSize > 200 && <div>• Zonierung für Teillastbetrieb</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call-to-Action basierend auf Zielgruppe */}
        <div className={`rounded-xl p-6 text-white shadow-lg ${
          targetAudience === 'kids' ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
          targetAudience === 'adults' ? 'bg-gradient-to-r from-red-500 to-red-600' :
          'bg-gradient-to-r from-blue-600 to-indigo-700'
        }`}>
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            {targetAudience === 'kids' ? '🎉 Super cool!' : 
             targetAudience === 'adults' ? '💡 Überzeugt?' :
             '🎯 Interesse geweckt?'}
          </h3>
          <p className="text-sm mb-4 opacity-90">
            {targetAudience === 'kids' ? 'Erzähl deinen Eltern von der tollen Wärmepumpe!' :
             targetAudience === 'adults' ? 'Lassen Sie sich unverbindlich von einem Vaillant Partner beraten!' :
             'Detaillierte Systemauslegung durch zertifizierte Vaillant Fachpartner.'}
          </p>
          <button className="w-full bg-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105">
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
            <div className="flex space-x-1">
              <button 
                onClick={() => setTargetAudience('adults')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  targetAudience === 'adults' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:text-white hover:bg-slate-800'
                }`}
              >
                Haushalt
              </button>
              <button 
                onClick={() => setTargetAudience('kids')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  targetAudience === 'kids' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:text-white hover:bg-slate-800'
                }`}
              >
                Kinder
              </button>
              <button 
                onClick={() => setTargetAudience('experts')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  targetAudience === 'experts' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:text-white hover:bg-slate-800'
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
            {/* Control Panel - EnergieExpert Style */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-slate-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-slate-600" />
                {targetAudience === 'kids' ? 'Spiel-Regler' :
                 targetAudience === 'adults' ? 'Einstellungen' :
                 'System-Parameter'}
              </h3>
              
              {renderParameters()}
            </div>

            {/* Main Visualization - EnergieExpert Style */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">
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