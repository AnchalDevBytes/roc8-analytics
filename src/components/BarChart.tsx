"use client";
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface BarChartProps {
  data: { label: string; value: number }[];
  onBarClick: (feature: string) => void;
}

const BarChart: React.FC<BarChartProps> = ({ data, onBarClick }) => {
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
            labels: data.map(item => item.label),
            datasets: [
              {
                label: 'Time Spent (hours)',
                data: data.map(item => item.value),
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
                display: false,
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
                onBarClick(feature);
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
  }, [data, onBarClick]);

  return <div className='w-full h-full items-center justify-center'>
          <canvas className='w-full h-full' ref={chartRef} />
        </div>;
};

export default BarChart;
