import React, { useState, useEffect } from "react";
import Papa from "papaparse";

import RegionSelector from "../components/RegionSelector";
import ErrorSlider from "../components/ErrorSlider";
import RandomSeedInput from "../components/RandomSeedInput";
import InfiniteScrollTable from "../components/InfiniteScrollTable";
import { generateUserData } from "../services/dataGenerator";
import Button from "../components/Button";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("USA");
  const [errorValue, setErrorValue] = useState(0);
  const [seedValue, setSeedValue] = useState(42);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [selectedRegion, errorValue, seedValue, page]);

  const fetchData = () => {
    try {
      const newData = generateUserData(
        selectedRegion,
        errorValue,
        seedValue,
        page
      );
      setData((prevData) => [...prevData, ...newData]);
      console.log(newData);
    } catch (error) {
      console.error("Error generating user data:", error);
    }
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    resetData();
  };

  const handleErrorChange = (event) => {
    setErrorValue(event.target.value);
    resetData();
  };

  const handleSeedChange = (event) => {
    setSeedValue(event.target.value);
    resetData();
  };

  const handleGenerateRandomSeed = () => {
    setSeedValue(Math.floor(Math.random() * 10000));
    resetData();
  };

  const resetData = () => {
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const exportToCSV = (data) => {
    const csvData = data.map((user) => ({
      Index: user.index,
      ID: user.id,
      Name: user.name,
      Address: user.address,
      Phone: user.phone,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "user_data.csv";
    link.click();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4 py-2 px-4 border-y border-stone-300">
        <div className="flex gap-4">
          <RegionSelector
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
          />
          <ErrorSlider
            errorValue={errorValue}
            onErrorChange={handleErrorChange}
          />
          <RandomSeedInput
            seedValue={seedValue}
            onSeedChange={handleSeedChange}
            onGenerateRandomSeed={handleGenerateRandomSeed}
          />
        </div>
        <Button onClick={() => exportToCSV(data)} />
      </div>
      <InfiniteScrollTable
        data={data}
        fetchMoreData={fetchMoreData}
        hasMore={hasMore}
      />
    </div>
  );
};

export default HomePage;
