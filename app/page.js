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
    <div className="w-full h-full flex flex-col justify-center items-center bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] ">

      <Login />
      {/* <Register /> */}
      {/* <AddData onNewDataAdded={triggerRefresh} /> */}
      {/* <MainPage refresh={refresh} onDeleted= {triggerRefresh} onUpdated={triggerRefresh} /> */}
      {/* <Dummy/> */}
    </div>
  );
};

export default Home;
