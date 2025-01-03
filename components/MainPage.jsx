"use client";
import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { Modal } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const MainPage = ({ refresh, onDeleted, onUpdated }) => {
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

  function showModal(title) {
    setUpdatedTitle(title);
    setIsModalOpen(true);
  }
  function showModal2(work) {
    // setUpdatedTitle(title);
    setIsModal2Open(true);
    setTaskTitle(work.title);
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
}

  const fetchWorks = async () => {
    setLoadings(true);
    try {
      const response = await fetch("/api/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWorks(data);
      } else {
        console.error("Failed to fetch works.");
      }
    } catch (err) {
      console.error("Error fetching works:", err);
    }
    setLoadings(false);
  };
 function handleOK(){
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
      onDeleted();
      onUpdated();
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
      onUpdated();
      setUpdateWindow("");
      setIsModalOpen(false);
      setUpdatedDescription("");
    } else {
      alert("Failed to update");
    }
  }

  return (
    <div className="w-full min-h-screen bg-red-300 mt-4 p-2 flex flex-col items-center gap-2">
      <h1 className="text-center font-bold text-2xl">MainPage</h1>

      {loadings && <p>Loading...</p>}
      <div className=" flex flex-col gap-2  ">
        {!loadings && works.length > 0
          ? works.map((work) => (
              <div
                key={work._id}
                className=" w-[70vw] flex bg-red-600 items-center  justify-around gap-2 border-2 b p-4 rounded-xl"
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
                    <p>
                       Description : {taskDescription}
                    </p>
                  </div>
                  </Modal>
                </div>
              </div>
            ))
          : !loadings && works.length === 0 && <p>No works found</p>}
      </div>
    </div>
  );
};
export default MainPage;
