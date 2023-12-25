import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface TemperatureEntry {
  date: string;
  temperature: number;
  color?: string; // Optional color property
}

interface TemperatureChartProps {
  data: TemperatureEntry[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // Find and destroy existing chart instance
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      const dates = data.map(entry => entry.date);
      const temperatures = data.map(entry => entry.temperature);
      const colors = data.map(entry => entry.color || 'rgba(75, 192, 192, 1)');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Temperature',
              data: temperatures,
              borderColor: colors,
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
              labels: dates,
            },
            y: {
              beginAtZero: true,
              max: 50,
            },
          },
        },
      });
    }
  }, [data]);


  return <canvas ref={chartRef} />;
};

export default TemperatureChart;
