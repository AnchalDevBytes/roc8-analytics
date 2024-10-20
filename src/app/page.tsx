"use client";

import {
  differenceInDays,
  eachDayOfInterval,
  format,
  parseISO,
} from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoShareOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { fetchFilteredData } from "@/helpers/filterDataApi";

const LineChart = dynamic(() => import("@/components/LineChart"), {
  suspense: true,
  ssr: false,
});
const BarChart = dynamic(() => import("@/components/BarChart"), {
  suspense: true,
  ssr: false,
});

const HomePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    ageGroup: "",
    gender: "",
  });

  // Set the initial filters based on cookies or search params
  useEffect(() => {
    const savedFilters = Cookies.get("filters")
      ? JSON.parse(Cookies.get("filters") || "{}")
      : {};

    const initialFilters = {
      startDate: savedFilters?.startDate ?? searchParams.get("startDate") ?? "",
      endDate: savedFilters?.endDate ?? searchParams.get("endDate") ?? "",
      ageGroup: savedFilters?.ageGroup ?? searchParams.get("ageGroup") ?? "",
      gender: savedFilters?.gender ?? searchParams.get("gender") ?? "",
    };

    setFilters(initialFilters);
  }, [searchParams]);

  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [featureData, setFeatureData] = useState<{ [key: string]: number[] }>(
    {}
  );
  const [lineData, setLineData] = useState<number[]>([]);
  const [barData, setBarData] = useState<{ label: string; value: number }[]>(
    []
  );
  const [dateLabels, setDateLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFilteredData(filters);
      if (data) {
        const transformedData = [
          {
            label: "Feature A",
            value: data.reduce((acc, item) => acc + item.featureA, 0),
          },
          {
            label: "Feature B",
            value: data.reduce((acc, item) => acc + item.featureB, 0),
          },
          {
            label: "Feature C",
            value: data.reduce((acc, item) => acc + item.featureC, 0),
          },
          {
            label: "Feature D",
            value: data.reduce((acc, item) => acc + item.featureD, 0),
          },
          {
            label: "Feature E",
            value: data.reduce((acc, item) => acc + item.featureE, 0),
          },
          {
            label: "Feature F",
            value: data.reduce((acc, item) => acc + item.featureF, 0),
          },
        ];
        setBarData(transformedData);

        const originalData = {
          "Feature A": data.map((item) => item.featureA),
          "Feature B": data.map((item) => item.featureB),
          "Feature C": data.map((item) => item.featureC),
          "Feature D": data.map((item) => item.featureD),
          "Feature E": data.map((item) => item.featureE),
          "Feature F": data.map((item) => item.featureF),
        };
        setFeatureData(originalData);
      }
    };
    fetchData();
  }, [filters]);

  const generateDateRange = (
    startDate: string,
    endDate: string,
    allDates: string[]
  ) => {
    if (!startDate || !endDate) return allDates;

    const start = parseISO(startDate);
    const end = parseISO(endDate);

    if (differenceInDays(end, start) < 0) return [];

    return eachDayOfInterval({ start, end }).map((date) =>
      format(date, "yyyy-MM-dd")
    );
  };

  const handleBarClick = (feature: string) => {
    setSelectedFeature(feature);
    const allAvailableDates = featureData[feature]
      ? featureData[feature]
          .map((_, index) => {
            return format(
              new Date().setDate(new Date().getDate() - index),
              "yyyy-MM-dd"
            );
          })
          .reverse()
      : [];
    const dateLabels = generateDateRange(
      filters.startDate,
      filters.endDate,
      allAvailableDates
    );
    setDateLabels(dateLabels);
    setLineData(featureData[feature] || []);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
    Cookies.set("filters", JSON.stringify(newFilters), { expires: 7 });
  };

  const updateUrlWithFilters = (newFilters: {
    startDate: string;
    endDate: string;
    ageGroup: string;
    gender: string;
  }) => {
    const query = new URLSearchParams(newFilters).toString();
    router.replace(`/?${query}`);
  };

  const handleCopyUrl = () => {
    if (typeof window !== "undefined" && window?.location?.href) {
      const url = window.location.href;
      window.navigator.clipboard
        .writeText(url)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch((error) => toast.error("Failed to copy link:", error));
    }
  };

  return (
    <main className="container mx-auto px-4 mt-20 lg:mt-28 py-8 space-y-8 bg-emerald-200">
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-bold mb-4 text-emerald-300">
            Data Visualization Dashboard
          </h2>
          <button
            onClick={handleCopyUrl}
            className="flex items-center pb-4 md:pb-2 text-muted-foreground text-sm text-teal-600 cursor-pointer hover:text-emerald-800 transition-all duration-300 lg:px-10 rounded-md"
          >
            <IoShareOutline className="w-4 h-4 mr-2" />
            <span>Share this article</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative flex flex-col gap-0">
            <label className="absolute -top-5 text-sm text-teal-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="border p-2 rounded bg-teal-100 text-black"
              placeholder="Start Date"
            />
          </div>
          <div className="relative flex flex-col gap-0">
            <label className="absolute -top-5 text-sm text-teal-700">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="border p-2 rounded bg-teal-100 text-black"
              placeholder="End Date"
            />
          </div>
          <select
            name="ageGroup"
            value={filters.ageGroup}
            onChange={handleFilterChange}
            className="border p-2 rounded bg-teal-100 text-black"
          >
            <option value="">Select Age Group</option>
            <option value="15-25">15-25</option>
            <option value=">25">26-35</option>
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-lg font-semibold mb-2 text-emerald-300">
            Feature Comparison
          </div>
          <div className="h-96">
            <Suspense fallback={<div>Loading Bar Chart...</div>}>
              <BarChart onBarClick={handleBarClick} data={barData} />
            </Suspense>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-lg font-semibold mb-2 text-emerald-300">
            Trends
          </div>
          <div className="h-96">
            <Suspense fallback={<div>Loading Line Chart...</div>}>
              <LineChart
                feature={selectedFeature}
                labels={dateLabels}
                data={lineData}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
