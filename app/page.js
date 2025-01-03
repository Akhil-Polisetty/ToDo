"use client";
import AddData from "@/components/AddData";
import Dummy from "@/components/Dummy";
import MainPage from "@/components/MainPage";
import React, { useState } from "react";

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(!refresh); // Toggle state to trigger refresh
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-white">
  
      <AddData onNewDataAdded={triggerRefresh} />
      <MainPage refresh={refresh} onDeleted= {triggerRefresh} onUpdated={triggerRefresh} />
      {/* <Dummy/> */}
    </div>
  );
};

export default Home;
