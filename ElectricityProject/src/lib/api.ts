export async function geocodePlz(plz: string) {
  const url = `https://nominatim.openstreetmap.org/search?postalcode=${plz}&country=de&format=json&limit=1`;
  const res = await fetch(url, { headers: { 'User-Agent': 'EnergieDashboard/1.0' } });
  const data = await res.json();
  if (data.length === 0) throw new Error("PLZ nicht gefunden");
  console.log('[Geocode]', plz, '→', data[0].lat, data[0].lon);
  return { lat: data[0].lat, lon: data[0].lon };
}

export async function fetchWeatherData(lat: string, lon: string) {
  const latFixed = Number(lat).toFixed(4);
  const lonFixed = Number(lon).toFixed(4);
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latFixed}&longitude=${lonFixed}&start_date=2023-01-01&end_date=2023-12-31&daily=shortwave_radiation_sum&radiation_model=cm-saf`;
  console.log('[Weather API]', url);
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    console.error('[Weather API ERROR]', res.status, res.statusText, text);
    // Fallback: Dummy-Daten
    return {
      daily: {
        shortwave_radiation_sum: Array(365).fill(2.74), // ca. 1000 kWh/m²/Jahr verteilt auf Tage
      },
      error: `Wetterdaten nicht verfügbar (${res.status}): ${text}`
    };
  }
  return await res.json();
}

export async function fetchElectricityPrice(plz: string) {
  if (plz.startsWith("A")) return 0.30;
  return 0.35;
} 