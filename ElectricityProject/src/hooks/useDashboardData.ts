import { useQuery } from "@tanstack/react-query";
import { geocodePlz, fetchWeatherData, fetchElectricityPrice } from "../lib/api";

export function useDashboardData(plz: string | null) {
  return useQuery({
    queryKey: ["dashboard-data", plz],
    queryFn: async () => {
      if (!plz) return null;
      const { lat, lon } = await geocodePlz(plz);
      const weather = await fetchWeatherData(lat, lon);
      const price = await fetchElectricityPrice(plz);
      return { weather, price };
    },
    enabled: !!plz,
  });
} 