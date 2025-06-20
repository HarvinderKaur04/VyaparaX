
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Positions',
    },
  },
};


// export function VerticalGraph({data}) {
//   return <Bar options={options} data={data} />;
// }
export function PositionChart({ data }) {
  const isValidData =
    data &&
    Array.isArray(data.labels) &&
    Array.isArray(data.datasets) &&
    data.datasets.length > 0;

  if (!isValidData) {
    return <p>No data available to render chart.</p>;
  }

  return <Bar options={options} data={data} />;
}
