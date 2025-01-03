import React from "react";
import { Button, message, Popconfirm } from "antd";

const Dummy = () => {
  const confirm = (e) => {
    console.log(e);
    console.log("clicked yes");
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <div>
      Dummy Component
      <Button type="primary">Click Me</Button>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    </div>
  );
};

export default Dummy;
