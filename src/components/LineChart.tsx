"use client";
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

interface LineChartProps {
  feature: string | null;
  data: number[];
  labels: string[];
}

const LineChart: React.FC<LineChartProps> = ({ feature, data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  let myChart: Chart | null = null;

  useEffect(() => {
    Chart.register(zoomPlugin);

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
            labels: labels || data.map((feat) => JSON.stringify(feat)),
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
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'xy',
                },
                zoom: {
                  enabled: true,
                  mode: 'xy',
                },
              } as any, // Cast as any or _DeepPartialObject<ZoomOptions>
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

  return <canvas ref={chartRef} className="w-full h-64" />;
};

export default LineChart;
