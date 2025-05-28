'use client'

import React, { useEffect, useState } from 'react';
import { Typography, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CustomModal from '@/components/common/CustomModal';
import { useModal } from '@/context/ModalContext';
import TaskForm from './TaskForm';
import { useTasks } from '@/hooks/task/useTasks';
import dayjs from 'dayjs';
import { useSocket } from '@/hooks/useSocket';
import { useTaskTransitions } from '@/hooks/task/useTaskTransitions';
import { useDebounce } from '@/hooks/useDebounce';
import PrimaryButton from '@/components/common/PrimaryButton';
import TaskCard from './TaskCard';
import DeleteTaskModal from './DeleteTaskModal';

interface ProjectTasksProps {
  projectId: string;
  projectName: string;
  onTaskCreated?: () => void;
}


const ProjectTasks: React.FC<ProjectTasksProps> = ({ projectId, onTaskCreated }) => {
  const [role, setRole] = useState<'manager' | 'employee'>('manager');
  const [deleteModal, setDeleteModal] = useState<{ visible: boolean; taskId: string | null }>({ visible: false, taskId: null });
  const { tasks, loading, fetchTasks, createTask, updateTask, deleteTask } = useTasks(projectId);
  
  const { openModal, closeModal } = useModal();
  const socket = useSocket();

  const {
    enteringTaskIds,
    handleTasksChange,
  } = useTaskTransitions(tasks, deleteTask, 300);

  useEffect(() => {
    fetchTasks();
  }, [projectId, fetchTasks]);

  useEffect(() => {
    handleTasksChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  useEffect(() => {
    if (!socket) return;
    const handleTaskCreated = (task: any) => {
      if (task.projectId === projectId) {
        fetchTasks();
      }
    };
    socket.on('taskCreated', handleTaskCreated);
    return () => {
      socket.off('taskCreated', handleTaskCreated);
    };
  }, [socket, projectId, fetchTasks]);

  const handleTaskSubmit = async (values: any) => {
    const submitValues = {
      ...values,
      dueDate: values.dueDate ? (values.dueDate.toISOString ? values.dueDate.toISOString() : values.dueDate) : null,
    };
    const success = await createTask(submitValues);
    if (success) {
      closeModal();
      if (onTaskCreated) onTaskCreated();
    }
  };

  const handleTaskUpdate = async (taskId: string, values: any) => {
    const submitValues = {
      ...values,
      dueDate: values.dueDate ? (values.dueDate.toISOString ? values.dueDate.toISOString() : values.dueDate) : null,
    };
    const success = await updateTask(taskId, submitValues);
    if (success) {
      closeModal();
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    await deleteTask(taskId);
    if (onTaskCreated) onTaskCreated();
  };

  const handleOpenTaskModal = (task?: any) => {
    openModal(
      <CustomModal
        open={true}
        title={task ? 'Edit Task' : 'Create Task'}
        onCancel={closeModal}
        footer={null}
      >
        <TaskForm
          onSubmit={task ? (values) => handleTaskUpdate(task.id, values) : debouncedHandleTaskSubmit}
          loading={loading}
          initialValues={task || {}}
          onCancel={closeModal}
          isEdit={!!task}
        />
      </CustomModal>
    );
  };

  const debouncedHandleTaskSubmit = useDebounce(handleTaskSubmit, 500);

  const handleDeleteClick = (taskId: string) => {
    setDeleteModal({ visible: true, taskId });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.taskId) {
      await handleTaskDelete(deleteModal.taskId);
      setDeleteModal({ visible: false, taskId: null });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ visible: false, taskId: null });
  };

  return (
    <div>
      <div className="mt-6 flex justify-between items-center">
        <Typography.Title level={4}>Tasks</Typography.Title>
        <div className="flex items-center gap-4 mb-5">
          <PrimaryButton onClick={() => setRole(role === 'manager' ? 'employee' : 'manager')}>
            Switch to {role === 'manager' ? 'Employee' : 'Manager'}
          </PrimaryButton>
          {role === 'manager' && (
            <PrimaryButton icon={<PlusOutlined />} onClick={() => handleOpenTaskModal()}>
              Add Task
            </PrimaryButton>
          )}
        </div>
      </div>
      <List
        dataSource={tasks}
        loading={loading}
        renderItem={task => {
          const isEntering = enteringTaskIds.has(task.id);
          return (
            <TaskCard
              key={task.id}
              task={task}
              isEntering={isEntering}
              onEdit={e => { e.stopPropagation(); handleOpenTaskModal(task); }}
              onDelete={e => { e.stopPropagation(); handleDeleteClick(task.id); }}
            />
          );
        }}
      />
      <DeleteTaskModal
        open={deleteModal.visible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ProjectTasks; 