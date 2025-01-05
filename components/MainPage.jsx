"use client";
import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { Modal } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import { Select, Dropdown } from "antd";
import { Input } from "antd";
import AddData from "./AddData";
import Cookies from "js-cookie";
import Image from "antd";
import {  useRouter } from "next/navigation";
// import userprofile from "../public/userprofile.svg";

const MainPage = () => {
  const [refresh, setRefresh] = useState(false);
  const router=useRouter();

  const triggerRefresh = () => {
    setRefresh(!refresh); // Toggle state to trigger refresh
  };

  const userid = Cookies.get("email");
  console.log("The cookie is ", userid);
  const [works, setWorks] = useState([]);
  const [updateWindow, setUpdateWindow] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [secondClick, setSecondClick] = useState(false);
  const [loadings, setLoadings] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [formatteddeadline, setformattedDeadline] = useState("");
  const [showTodayTask, setShowTodayTask] = useState(false);
  const [showTomorrowTask, setShowTomorrowTask] = useState(false);

  const [activeUsername, setActiveUsername] = useState("");
  const [activeUserEmail, setActiveUserEmail] = useState("");

function handleLogout(){
  Cookies.remove('email');
  Cookies.remove('username');
  router.push('/pages/login');
}

  const items = [
    {
      label: <p>{activeUsername}</p>,
      key: "0",
    },
    {
      label: <p>{activeUserEmail}</p>,
      key: "1",
    },

    {
      label: <p onClick={handleLogout}>Logout</p>,
      key: "2",
    },
  ];

  function handleTodayTask() {
    setShowTodayTask(!showTodayTask);
    setShowTomorrowTask(false);
  }
  function handleTomorrowTask() {
    setShowTomorrowTask(!showTomorrowTask);
    setShowTodayTask(false);
  }

  function handleShowTask(value) {
    if (value == "all") {
      setShowTodayTask(false);
      setShowTomorrowTask(false);
    }
    if (value == "today") {
      handleTodayTask();
    } else if (value == "tomorrow") {
      handleTomorrowTask();
    }
  }

  let today = new Date();
  let formatToday = today.toLocaleDateString();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  let formatTomorrow = tomorrow.toLocaleDateString();
  function showModal(title) {
    setUpdatedTitle(title);
    setIsModalOpen(true);
  }
  function showModal2(work) {
    // setUpdatedTitle(title);
    setIsModal2Open(true);
    setTaskTitle(work.title);
    setDeadline(work.date);
    const tempDate = new Date(work.date);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (tempDate.toLocaleDateString() == today.toLocaleDateString()) {
      setformattedDeadline("Today");
    } else if (tempDate.toLocaleDateString() == tomorrow.toLocaleDateString()) {
      setformattedDeadline("Tomorrow");
    } else {
      setformattedDeadline(tempDate.toLocaleDateString());
    }
    setTaskDescription(work.description);
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setUpdatedDescription("");
  };

  const handleCancel2 = () => {
    setIsModal2Open(false);
  };

  const fetchWorks = async () => {
    setActiveUserEmail(Cookies.get("email"));
    setActiveUsername(Cookies.get("username"));

    setLoadings(true);
    try {
      const response = await fetch("/api/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const works_list = data.works_list;
        setWorks(works_list);
      } else {
        console.error("Failed to fetch works.");
      }
    } catch (err) {
      console.error("Error fetching works:", err);
    }
    setLoadings(false);
  };
  function handleOK() {
    setIsModal2Open(false);
  }
  useEffect(() => {
    fetchWorks();
  }, [refresh]);

  async function handleDelete(title) {
    const response = await fetch("/api/dashboard", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (response.ok) {
      alert("Deleted");
      triggerRefresh();
    } else {
      alert("Failed to delete");
    }
  }

  function handleUpdate(title) {
    setUpdatedTitle(title);
    setUpdateWindow(title);
    setSecondClick(!secondClick);
  }
  async function handleUpdate2(title) {
    const response = await fetch("/api/dashboard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, updatedDescription }),
    });
    if (response.ok) {
      alert("Updated");
      triggerRefresh();
      setUpdateWindow("");
      setIsModalOpen(false);
      setUpdatedDescription("");
    } else {
      alert("Failed to update");
    }
  }

  return (
    <div className="w-full min-h-screen   p-2 flex flex-col items-center gap-2">
      <div className="flex gap-4">
        <h1>
          {" "}
          <AddData onNewDataAdded={triggerRefresh} />
        </h1>
        <h1 className="text-center text-white font-bold text-2xl">Task Tracker</h1>
        <Space direction="vertical" id="deadline">
          <Select
            defaultValue="all"
            style={{
              width: 120,
            }}
            onChange={handleShowTask}
            options={[
              {
                value: "all",
                label: "All Tasks",
              },
              {
                value: "today",
                label: "Today Tasks",
              },
              {
                value: "tomorrow",
                label: "Tomorrow Tasks",
              },
            ]}
          />
        </Space>
        {/* <h1  className="font-bold text-2xl cursor-pointer " onClick={handleTodayTask}>Show Today Taks</h1> */}
        {/* <h1  className="font-bold text-2xl cursor-pointer " onClick={handleTomorrowTask}>Show Tomorrow Taks</h1> */}

        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <img
                src="/userprofile.svg"
                className="h-10 w-10 bg-slate-500 rounded-full p-1 relative left-4 "
              />
            </Space>
          </a>
        </Dropdown>
      </div>

      {loadings && <p>Loading...</p>}
      <div className=" flex flex-col gap-2  ">
        {works.length > 0
          ? works.map((work) => (
              <div
                key={work._id}
                className={`w-[70vw] flex items-center justify-around gap-2 border-2 p-4 rounded-xl ${
                  new Date(work.date).toLocaleDateString() === formatToday
                    ? "bg-red-300"
                    : new Date(work.date).toLocaleDateString() ===
                      formatTomorrow
                    ? "bg-orange-300"
                    : "bg-green-300"
                }
               ${
                 showTodayTask &&
                 new Date(work.date).toLocaleDateString() !== formatToday
                   ? "hidden"
                   : ""
               }
               ${
                 showTomorrowTask &&
                 new Date(work.date).toLocaleDateString() !== formatTomorrow
                   ? "hidden"
                   : ""
               }`}
              >
                <div className="flex items-center ">
                  <h2 className="font-bold text-xl">{work.title} </h2>
                  {/* <p>{work.description}</p> */}
                </div>
                <div className="flex gap-2">
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => handleDelete(work.title)}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <div>
                      <Button danger>
                        <DeleteFilled /> Delete
                      </Button>
                    </div>
                  </Popconfirm>
                  <Button type="primary" onClick={() => showModal(work.title)}>
                    Update
                  </Button>
                  <Modal
                    title="Update Task"
                    open={isModalOpen}
                    onOk={() => handleUpdate2(updatedTitle)}
                    onCancel={handleCancel}
                  >
                    <textarea
                      className="border-2 border-red-300"
                      placeholder="Update Description"
                      rows="2"
                      cols="60"
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                  </Modal>
                  <Button type="primary" onClick={() => showModal2(work)}>
                    View
                  </Button>
                  <Modal
                    // title="Task Details"
                    open={isModal2Open}
                    onOk={handleOK}
                    onCancel={handleCancel2}
                  >
                    <div className="flex flex-col gap-2 ">
                      <h1> Title : {taskTitle}</h1>
                      <p>Description : {taskDescription}</p>

                      {deadline ? (
                        <p> Deadline : {formatteddeadline}</p>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </Modal>
                </div>
              </div>
            ))
          : works.length === 0 && <p>No works found</p>}
      </div>
    </div>
  );
};
export default MainPage;
