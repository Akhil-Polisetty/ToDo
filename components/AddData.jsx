"use client";
import React, { useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import { Select } from "antd";

const AddData = ({ onNewDataAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date();
  const [dateselect, setDateSelect] = useState("");
  const [finalDate, setFinalDate] = useState();
  const [calenderDate, setCalenderDate] = useState();
  // Create a new Date object for tomorrow
  const tomorrow = new Date(today);

  // Add 1 day to today's date
  tomorrow.setDate(today.getDate() + 1);
  console.log("Tomorrow's Date:", tomorrow.toDateString());
  // Outputs the date in a readable format
  const onChange = (date, dateString) => {
    console.log(dateString);
    setCalenderDate(date);
  };
  function showModal() {
    setIsModalOpen(true);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
    if (value == "today") {
      setFinalDate(today);
      setCalenderDate(null);
    } else if (value == "tomorrow") {
      setFinalDate(tomorrow);
      setCalenderDate(null);
    } else {
      setCalenderDate(new Date());
      setFinalDate(calenderDate);
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
    try {
      const response = await fetch("/api/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
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
    setCalenderDate(null)
  };

  return (
    <div className="mt-2 rounded-xl bg-blue-300 p-4 text-black w-80 flex flex-col justify-center items-center align-center">
      {/* <h2 className="text-center font-bold text-2xl">Add New Task</h2> */}
      <Button type="primary" onClick={showModal} className="font-bold">
        <PlusOutlined /> Add New Task
      </Button>
      <Modal
        title="Update Task"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 items-center justify-center bg-orange-300 p-2"
        >
          <div>
            <label htmlFor="title">Enter Title : </label>
            <input
              type="text"
              placeholder="Task Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              name="title"
            />
          </div>
          <div>
            <label htmlFor="description">Enter Title : </label>
            <textarea
              id="description"
              name="description"
              placeholder="Task Description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div >
          <label htmlFor="deadline">Select Deadline : </label>
          <Space direction="vertical" id="deadline">
            <Select
              defaultValue={today}
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
            {calenderDate != null && <DatePicker onChange={onChange} />}
          </Space></div>
        </form>
      </Modal>
    </div>
  );
};

export default AddData;
