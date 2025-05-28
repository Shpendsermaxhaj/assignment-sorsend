import { Form, Input } from "antd";
import React from "react";
import PrimaryButton from '@/components/common/PrimaryButton';

export interface ProjectFormValues {
  name: string;
  description?: string | null;
}

interface ProjectFormProps {
  onSubmit: (values: ProjectFormValues) => void;
  loading?: boolean;
  initialValues?: ProjectFormValues;
  onCancel?: () => void;
  isEdit?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, loading, initialValues, onCancel, isEdit = false }) => {
  const [form] = Form.useForm<ProjectFormValues>();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values: ProjectFormValues) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Project Name"
        rules={[{ required: true, message: 'Please enter project name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <PrimaryButton type="submit" disabled={loading}>
          {isEdit ? 'Update' : 'Create'} Project
        </PrimaryButton>
        {onCancel && (
          <PrimaryButton onClick={onCancel} style={{ marginLeft: 8 }}>
            Cancel
          </PrimaryButton>
        )}
      </Form.Item>
    </Form>
  );
};

export default ProjectForm; 