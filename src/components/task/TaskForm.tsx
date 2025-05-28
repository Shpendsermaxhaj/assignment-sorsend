import { Form, Input, Button, Select, DatePicker, Space } from "antd";
import React from "react";
import dayjs from "dayjs";
import PrimaryButton from '@/components/common/PrimaryButton';

interface CreateTaskFormProps {
  onSubmit: (values: any) => void;
  loading?: boolean;
  initialValues?: any;
  onCancel?: () => void;
  isEdit?: boolean;
}

const STATUS_OPTIONS = [
  { value: 'TODO', label: 'To Do' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'DONE', label: 'Done' },
];

const PRIORITY_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  onSubmit,
  loading,
  initialValues,
  onCancel,
  isEdit = false,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        dueDate: initialValues.dueDate
          ? dayjs(initialValues.dueDate)
          : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        ...initialValues,
        dueDate: initialValues?.dueDate ? dayjs(initialValues.dueDate) : null,
      }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please enter task title" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter task description" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select task status" }]}
      >
        <Select>
          {STATUS_OPTIONS.map(opt => (
            <Select.Option key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: "Please select task priority" }]}
      >
        <Select>
          {PRIORITY_OPTIONS.map(opt => (
            <Select.Option key={opt.value} value={opt.value}>
              {opt.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true, message: "Please select a due date" }]}
      >
        <DatePicker 
          className="w-full" 
          disabledDate={current => current && current < dayjs().startOf('day')}
        />
      </Form.Item>
      <Form.Item>
        <Space>
          <PrimaryButton type="submit" disabled={loading}>
            {isEdit ? "Update" : "Create"}
          </PrimaryButton>
          {onCancel && (
            <PrimaryButton onClick={onCancel}>
              Cancel
            </PrimaryButton>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateTaskForm; 