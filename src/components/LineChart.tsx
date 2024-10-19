"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";

interface LineChartProps {
  feature: string | null;
  data: number[];
  labels: string[];
}

const LineChart: React.FC<LineChartProps> = ({ feature, data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    Chart.register(zoomPlugin);

    if (!feature || data.length === 0) return;

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels || data.map((feat) => JSON.stringify(feat)),
            datasets: [
              {
                label: `${feature} Time Trend`,
                data: data,
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: `${feature} Time Trend`,
              },
              zoom: {
                pan: {
                  enabled: true,
                  mode: "xy",
                },
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
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feature, data]);

  return <canvas ref={chartRef} className="w-full h-64" />;
};

export default LineChart;
