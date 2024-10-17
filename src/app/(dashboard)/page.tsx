"use client";
import { BarChart, LineChart } from '@/components';
import { fetchFilteredData } from '@/helpers/filterDataApi';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [lineData, setLineData] = useState<number[]>([]);
  const [barData, setBarData] = useState<{ label: string; value: number }[]>([]);
  const [filters, setFilters] = useState({ date: '', ageGroup: '', gender: '' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFilteredData(filters);
      if(data){
        const transformedData = [
          { label: 'Feature A', value: data.reduce((acc, item) => acc + item.featureA, 0) },
          { label: 'Feature B', value: data.reduce((acc, item) => acc + item.featureB, 0) },
          { label: 'Feature C', value: data.reduce((acc, item) => acc + item.featureC, 0) },
          { label: 'Feature D', value: data.reduce((acc, item) => acc + item.featureD, 0) },
          { label: 'Feature E', value: data.reduce((acc, item) => acc + item.featureE, 0) },
          { label: 'Feature F', value: data.reduce((acc, item) => acc + item.featureF, 0) },
        ];
        setBarData(transformedData);
      }
    };
    fetchData();
  },[filters]);

  const handleBarClick = (feature: string, data: number[]) => {
    setSelectedFeature(feature);
    setLineData(data);
  };

  const handleFilterChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className='w-full min-h-screen py-10 px-5 bg-teal-50 flex flex-col items-center lg:justify-between lg:gap-20 lg:p-32'>
      <div className="mb-10 flex flex-col lg:flex-row gap-4">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="border p-2 rounded bg-teal-100 text-black"
          placeholder="Select Date"
        />
        <select
          name="ageGroup"
          value={filters.ageGroup}
          onChange={handleFilterChange}
          className="border p-2 rounded bg-teal-100 text-black"
        >
          <option value="">Select Age Group</option>
          <option value="15-25">15-25</option>
          <option value=">25">{`26-35`}</option>
        </select>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="border p-2 rounded bg-teal-100 text-black"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className='w-full flex flex-col lg:flex-row lg:gap-20'>
        <div className='w-full lg:w-1/2 h-full items-center justify-center flex'>
          <BarChart onBarClick={handleBarClick} data={barData} />
        </div>
        <div className='w-full lg:w-1/2 h-full items-center justify-center flex'>
          <LineChart feature={selectedFeature} data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
