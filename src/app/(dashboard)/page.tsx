"use client";
import { BarChart, LineChart } from '@/components';
import { fetchFilteredData } from '@/helpers/filterDataApi';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IoShareOutline } from "react-icons/io5";

const HomePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFilters = {
    date: searchParams.get('date') || '',
    ageGroup: searchParams.get('ageGroup') || '',
    gender: searchParams.get('gender') || '',
  };

  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [featureData, setFeatureData] = useState<{ [key : string] : number[] }>({});
  const [lineData, setLineData] = useState<number[]>([]);
  const [barData, setBarData] = useState<{ label: string; value: number }[]>([]);
  const [filters, setFilters] = useState(initialFilters);

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

        const originalData = {
          'Feature A': data.map(item => item.featureA),
          'Feature B': data.map(item => item.featureB),
          'Feature C': data.map(item => item.featureC),
          'Feature D': data.map(item => item.featureD),
          'Feature E': data.map(item => item.featureE),
          'Feature F': data.map(item => item.featureF),
        };
        setFeatureData(originalData);
      }
    };
    fetchData();
  },[filters]);

  const handleBarClick = (feature: string) => {
    setSelectedFeature(feature);
    setLineData(featureData[feature] || []);
  };

  const handleFilterChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name] : value };
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }

  const updateUrlWithFilters = (
    newFilters: {
     date : string; 
     ageGroup: string; 
     gender: string
  }) => {
    const query = new URLSearchParams(newFilters).toString();
    router.replace(`/?${query}`);
  };

  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
    .then(() => toast.success('Link copied to clipboard!'))
    .catch((error) => toast.error('Failed to copy link:', error));
  }

  useEffect(() => {
    if (searchParams.toString()) {
      setFilters(initialFilters);
    }
  }, [searchParams]);

  return (
     <div className="container mx-auto px-4 py-8 space-y-8 bg-emerald-200">
     <div className="bg-white shadow rounded-lg p-4">
       <div className="text-xl font-bold mb-4 text-emerald-300">Data Visualization Dashboard</div>
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
          <button
           onClick={handleCopyUrl}
           className="flex items-center text-muted-foreground text-sm text-teal-600 cursor-pointer hover:text-emerald-800 lg:hover:border-2 lg:hover:border-emerald-400 transition-all duration-300 lg:px-10 rounded-md"
          >
           <IoShareOutline className="w-4 h-4 mr-2" />
           <span>Share this article</span>
          </button>
       </div>
     </div>
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       <div className="bg-white shadow rounded-lg p-4">
         <div className="text-lg font-semibold mb-2 text-emerald-300">Feature Comparison</div>
         <div className="h-96">
           <BarChart onBarClick={handleBarClick} data={barData} />
         </div>
       </div>
       <div className="bg-white shadow rounded-lg p-4">
         <div className="text-lg font-semibold mb-2 text-emerald-300">
           {selectedFeature ? `${selectedFeature} Trend` : 'Select a Feature'}
         </div>
         <div className="h-96">
           <LineChart feature={selectedFeature} data={lineData} />
         </div>
       </div>
     </div>
   </div>
  );
};

export default HomePage;
