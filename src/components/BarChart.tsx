"use client";
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface BarChartProps {
  onBarClick: (feature: string, data: number[]) => void;
}

const BarChart: React.FC<BarChartProps> = ({ onBarClick }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  let myChart: Chart | null = null;

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        if (myChart) {
          myChart.destroy();
        }

        myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E', 'Feature F'],
            datasets: [
              {
                label: 'Time Spent (hours)',
                data: [12, 19, 3, 5, 2, 7],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            indexAxis: 'y',
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Feature Usage in Hours',
              },
            },
            scales: {
              x: {
                beginAtZero: true,
              },
            },
            onClick: (event, elements) => {
              if (elements.length > 0) {
                const index = elements[0].index;
                const feature = myChart!.data.labels![index] as string;
                const data = [Math.random() * 10, Math.random() * 20, Math.random() * 15, Math.random() * 25];
                onBarClick(feature, data);
              }
            },
          },
        });
      }
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [onBarClick]);

  return <div className='w-full h-full items-center justify-center'>
          <canvas ref={chartRef} />
        </div>;
};

export default BarChart;
