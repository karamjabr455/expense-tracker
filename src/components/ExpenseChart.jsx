import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = ({ transactions }) => {
  const categories = [...new Set(transactions.map(t => t.category))];
  const data = categories.map(cat => {
    return transactions
      .filter(t => t.category === cat)
      .reduce((total, t) => total + parseFloat(t.amount), 0);
  });

  const chartData = {
    labels: categories,
    datasets: [{
      label: 'Expenses by Category',
      data: data,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to grow with the container
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          callback: function(value) {
            return `$${value}`;
          }
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 border rounded-lg shadow-lg bg-[#3d3d3d]">
      <h2 className="text-2xl font-semibold mb-4 text-white">مخطط النفقات</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="relative" style={{ height: '300px' }}>
          <Chart type='bar' data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
