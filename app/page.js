"use client";
import AddData from "@/components/AddData";
import Dummy from "@/components/Dummy";
import Login from "@/components/Login";
import MainPage from "@/components/MainPage";
import Register from "@/components/Register";
import React, { useState } from "react";

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(!refresh); // Toggle state to trigger refresh
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">

      <Login />
      {/* <Register /> */}
      {/* <AddData onNewDataAdded={triggerRefresh} /> */}
      {/* <MainPage refresh={refresh} onDeleted= {triggerRefresh} onUpdated={triggerRefresh} /> */}
      {/* <Dummy/> */}
    </div>
  );
};

export default Home;
