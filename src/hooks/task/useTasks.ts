import { useState, useCallback } from 'react';
import { message } from 'antd';
import { useSocket } from '@/hooks/useSocket';


export function useTasks(projectId: string) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${projectId}/tasks`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setTasks(data);
      }
    } catch (error) {
      message.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const createTask = useCallback(async (values: any) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Failed to create task');
      const newTask = await response.json();
      setTasks(prev => [...prev, newTask]);
      message.success('Task created successfully');
      if (socket) {
        socket.emit('taskCreated', newTask);
      }
      return true;
    } catch (error) {
      message.error('Failed to create task');
      return false;
    }
  }, [projectId, socket]);

  const updateTask = useCallback(async (taskId: string, values: any) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Failed to update task');
      const updatedTask = await response.json();
      setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
      message.success('Task updated successfully');
      return true;
    } catch (error) {
      message.error('Failed to update task');
      return false;
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(prev => prev.filter(task => task.id !== taskId));
      message.success('Task deleted successfully');
    } catch (error) {
      message.error('Failed to delete task');
    }
  }, []);

  return {
    tasks,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
} 