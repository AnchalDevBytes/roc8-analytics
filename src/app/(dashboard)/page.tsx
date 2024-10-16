"use client";
import { BarChart, LineChart } from '@/components';
import React, { useState } from 'react';

const HomePage = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [lineData, setLineData] = useState<number[]>([]);

  const handleBarClick = (feature: string, data: number[]) => {
    setSelectedFeature(feature);
    setLineData(data);
  };

  return (
    <div className='w-full min-h-screen py-10 px-5 bg-teal-50 flex flex-col lg:flex-row items-center lg:justify-between lg:gap-20 lg:p-32'>
      <div className='w-full lg:w-1/2 h-full items-center justify-center flex'>
        <BarChart onBarClick={handleBarClick} />
      </div>
      <div className='w-full lg:w-1/2 h-full items-center justify-center flex'>
        <LineChart feature={selectedFeature} data={lineData} />
      </div>
    </div>
  );
};

export default HomePage;
