"use client";
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineChartProps {
  feature: string | null;
  data: number[];
}

const LineChart: React.FC<LineChartProps> = ({ feature, data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  let myChart: Chart | null = null;

  useEffect(() => {
    if (!feature || data.length === 0) return;
    
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        if (myChart) {
          myChart.destroy();
        }

        myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [
              {
                label: `${feature} Time Trend`,
                data: data,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `${feature} Time Trend`,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
              },
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
  }, [feature, data]);

  return (
    <div className='w-full h-full'>
      {feature && <h2 className='text-teal-950'>Line Chart for {feature}</h2>}
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
