export function calculatePvSavings(weather: any, electricityPrice: number) {
  if (!weather?.daily?.shortwave_radiation_sum) return [0, 0, 0, 0];
  // 1. MJ/m² → kWh/m²
  const dailyKWh = weather.daily.shortwave_radiation_sum.map((mj: number) => mj * 0.2778);
  // 2. Jahressumme
  const annualRadiation = dailyKWh.reduce((sum: number, val: number) => sum + val, 0);
  // 3. PV-Ertrag
  const pvPower = 5; // kWp
  const performanceRatio = 0.8;
  const annualYield = annualRadiation * pvPower * performanceRatio;
  // 4. Ersparnis
  const annualSavings = annualYield * electricityPrice;
  // Entwicklung über 1, 5, 10, 20 Jahre (ohne Degradation, Inflation etc.)
  return [1, 5, 10, 20].map(factor => Math.round(annualSavings * factor));
} 