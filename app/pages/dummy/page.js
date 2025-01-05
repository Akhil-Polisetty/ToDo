import React from "react";
import { Form, Input, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
const TestForm = () => {
  return (
    <Form>
      <FormItem label="Test Label" name="test">
        <Input placeholder="Test Input" />
      </FormItem>
      <FormItem>
        <Button type="primary">Submit</Button>
      </FormItem>
    </Form>
  );
};

export default TestForm;
