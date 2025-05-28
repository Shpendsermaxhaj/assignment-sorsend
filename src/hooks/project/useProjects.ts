import { useState, useCallback } from "react";
import { message } from "antd";
import type { Project as BaseProject } from "@/types";

export interface Project extends BaseProject {
  _count: { tasks: number };
}

export function useProjects({ initialData }: { initialData?: Project[] } = {}) {
  const [projects, setProjects] = useState<Project[]>(initialData || []);
  const [loading, setLoading] = useState(!initialData);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      message.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (values: any) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create project');
      message.success('Project created successfully');
      fetchProjects();
      return true;
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to create project');
      return false;
    }
  }, [fetchProjects]);

  const updateProject = useCallback(async (id: string, values: any) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update project');
      message.success('Project updated successfully');
      fetchProjects();
      return true;
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to update project');
      return false;
    }
  }, [fetchProjects]);

  const deleteProject = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete project');
      message.success('Project deleted successfully');
      fetchProjects();
      return true;
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to delete project');
      return false;
    }
  }, [fetchProjects]);

  return {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
} 