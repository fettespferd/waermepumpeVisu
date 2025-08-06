import { useDashboard } from "../../context/DashboardContext";

export function ComponentSelector() {
  const { components, setComponents } = useDashboard();
  return (
    <div className="flex gap-4">
      {[
        { key: "heatpump", label: "Wärmepumpe" },
        { key: "battery", label: "Batterie" },
        { key: "pv", label: "Photovoltaik" },
      ].map(({ key, label }) => (
        <label key={key} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={components[key as keyof typeof components]}
            onChange={e => setComponents({ ...components, [key]: e.target.checked })}
            className="accent-blue-500 w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
          {label}
        </label>
      ))}
    </div>
  );
} 