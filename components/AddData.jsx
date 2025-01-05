"use client";
import React, { useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import { Select } from "antd";
import { Input } from "antd";
const AddData = ({ onNewDataAdded }) => {
  const [title, setTitle] = useState("");
  const { TextArea } = Input;
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateselect, setDateSelect] = useState("");
  const [finalDate, setFinalDate] = useState();
  const [calenderDate, setCalenderDate] = useState(false);
  const today = new Date();
  const tomorrow = new Date(today);

  tomorrow.setDate(today.getDate() + 1);
  console.log("Tomorrow's Date:", tomorrow.toDateString());

  const onChange = (date, dateString) => {
    console.log(dateString);
    setCalenderDate(ture);
    setFinalDate(date);
  };
  function showModal() {
    setIsModalOpen(true);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
    if (value == "today") {
      setFinalDate(today);
      setCalenderDate(false);
    } else if (value == "tomorrow") {
      setFinalDate(tomorrow);
      setCalenderDate(false);
    } else {
      setCalenderDate(true);
      setFinalDate(null);
    }
  }

  function handleCancel() {
    setIsModalOpen(false);
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || description === "") {
      alert("Please fill all the fields");
      return;
    }
    console.log("The final date is ",finalDate);
    try {
      const response = await fetch("/api/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({ title, description, date: finalDate }),
      });

      if (response.ok) {
        alert("Data added successfully");
        setTitle("");
        setDescription("");
        onNewDataAdded(); // Trigger refresh
      } else {
        alert("Failed to add data");
      }
    } catch (err) {
      console.error("Error adding data:", err);
    }
    setIsModalOpen(false); // Close modal after successful add
    setCalenderDate(null);
  };

  return (
    <div className="rounded-xl   text-black  flex flex-col justify-center items-center align-center">
      {/* <h2 className="text-center font-bold text-2xl">Add New Task</h2> */}
      <Button type="primary" onClick={showModal} className="font-bold">
        <PlusOutlined /> Add New Task
      </Button>
      <Modal
        title="Add Task"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 items-center justify-center bg-orange-300 p-3 rounded-2xl "
        >
          <div className="flex flex-col">
            <label htmlFor="title" className="font-bold   ">
              Enter Title : 
            </label>
            <Input
              size="large"
              className="w-[310px] mt-1.5 "
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="font-bold">
              Enter Description : 
            </label>

            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              autoSize={{
                minRows: 4,
                maxRows: 5,
              }}
              className="w-[310px] mt-1.5"
            />
          </div>
          <div className="flex gap-2 justify-between ">
            <label htmlFor="deadline" className="font-bold mt-1">
              Select Deadline :{" "}
            </label>
            <Space direction="vertical" id="deadline">
              <Select
                defaultValue="today"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "today",
                    label: "Today",
                  },
                  {
                    value: "tomorrow",
                    label: "Tomorrow",
                  },
                  {
                    value: "calender",
                    label: "Select from calender",
                  },
                ]}
              />
              {calenderDate  && <DatePicker onChange={onChange} />}
            </Space>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddData;
