import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function SavingsChart({ data }: { data: { years: number[]; savings: number[] } }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-bold mb-2">Gesamteinsparung (€)</h3>
      <Line
        data={{
          labels: data.years,
          datasets: [
            {
              label: "Ersparnis",
              data: data.savings,
              borderColor: "#009688",
              backgroundColor: "rgba(0,150,136,0.1)",
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
        }}
      />
    </div>
  );
} 