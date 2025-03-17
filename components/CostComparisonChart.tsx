'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

export default function CostComparisonChart() {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}% of US Average`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 160,
        ticks: {
          callback: function(value: number) {
            return value + '%';
          }
        }
      }
    }
  };

  const chartData = {
    labels: ['Housing (Off-Base)', 'Utilities', 'Groceries', 'Transportation', 'Healthcare', 'Entertainment'],
    datasets: [
      {
        label: 'Okinawa',
        data: [85, 75, 95, 65, 50, 70],
        backgroundColor: 'rgba(231, 93, 124, 0.8)', // primary-pink with opacity
        borderColor: 'rgba(231, 93, 124, 1)',
        borderWidth: 1
      },
      {
        label: 'US Average',
        data: [100, 100, 100, 100, 100, 100],
        backgroundColor: 'rgba(200, 200, 200, 0.8)', // grey with opacity
        borderColor: 'rgba(200, 200, 200, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <div style={{ height: '400px' }}>
          <Bar options={chartOptions} data={chartData} />
        </div>
        <div className="mt-4">
          <p className="small text-muted mb-0">
            * Percentages are relative to US average (100%). Data reflects costs after currency conversion (¥150 = $1 USD).
            Off-base housing costs shown before OHA. Actual costs may vary based on location, lifestyle, and exchange rates.
            Healthcare costs reflect out-of-pocket expenses, as most military healthcare is covered by Tricare.
          </p>
        </div>
      </div>
    </div>
  );
}
