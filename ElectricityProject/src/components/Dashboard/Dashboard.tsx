import { ComponentSelector } from "./ComponentSelector";
import { PlzInput } from "./PlzInput";
import { SavingsChart } from "./SavingsChart";
import { DashboardProvider } from "../../context/DashboardContext";
import { useState } from "react";
import { useDashboardData } from "../../hooks/useDashboardData";
import { calculatePvSavings } from "../../lib/calculations";

export function Dashboard() {
  const [plz, setPlz] = useState<string>("10115"); // Default: Berlin
  const { data, isLoading, error } = useDashboardData(plz);

  const savings = data ? calculatePvSavings(data.weather, data.price) : [0, 0, 0, 0];

  return (
    <DashboardProvider>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background py-12">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 space-y-6">
          <ComponentSelector />
          <PlzInput onDataLoaded={(data: { plz: string }) => setPlz(data.plz)} />
          {isLoading && <div>Lade Wetter- und Preisdaten…</div>}
          {error && <div className="text-red-600">Fehler: {String(error)}</div>}
          <SavingsChart data={{ years: [1, 5, 10, 20], savings }} />
        </div>
      </div>
    </DashboardProvider>
  );
} 