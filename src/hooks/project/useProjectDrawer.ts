'use client'

import { useState, useCallback } from 'react';
import { message } from 'antd';

export function useProjectDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [drawerLoading, setDrawerLoading] = useState(false);

  const openDrawer = useCallback(async (projectId: string) => {
    setIsDrawerOpen(true);
    setDrawerLoading(true);
    try {
      const projectRes = await fetch(`/api/projects/${projectId}`);
      const projectData = await projectRes.json();
      setProjectDetails(projectData);
    } catch (e) {
      setProjectDetails(null);
      message.error('Failed to load project details');
    } finally {
      setDrawerLoading(false);
    }
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setProjectDetails(null);
  }, []);

  return {
    isDrawerOpen,
    projectDetails,
    drawerLoading,
    openDrawer,
    closeDrawer,
  };
} 