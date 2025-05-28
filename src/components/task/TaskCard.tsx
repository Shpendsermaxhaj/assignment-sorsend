import { Card as AntCard, Tag, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import React from 'react';

const STATUS_COLORS: Record<string, string> = {
  TODO: 'orange',
  IN_PROGRESS: 'blue',
  DONE: 'green',
};

const PRIORITY_COLORS: Record<string, string> = {
  LOW: 'default',
  MEDIUM: 'gold',
  HIGH: 'red',
};

interface TaskCardProps {
  task: any;
  isEntering: boolean;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isEntering, onEdit, onDelete }) => {
  const isOverdue = task.dueDate && dayjs(task.dueDate).isBefore(dayjs(), 'day');
  const statusColor = STATUS_COLORS[task.status] || 'default';
  const priorityColor = PRIORITY_COLORS[task.priority] || 'default';
  return (
    <AntCard
      styles={{ body: { width: '100%' } }}
      className={
        `transition-all duration-300 ease-in-out ` +
        (isEntering ? 'opacity-0 scale-95 ' : 'opacity-100 scale-100 ') +
        'hover:scale-105 cursor-pointer'
      }
      onClick={onEdit}
      actions={[
        <Button key="edit" type="text" icon={<EditOutlined />} onClick={onEdit} />,
        <Button key="delete" type="text" danger icon={<DeleteOutlined />} onClick={onDelete} />,
      ]}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{task.title}</div>
          <div>{task.description}</div>
          <div className="mt-2">
            <Tag color={statusColor}>{task.status}</Tag>
            <Tag color={priorityColor}>Priority: {task.priority}</Tag>
            {task.dueDate && (
              <Tag color={isOverdue ? 'red' : undefined}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </Tag>
            )}
          </div>
        </div>
      </div>
    </AntCard>
  );
};

export default TaskCard; 