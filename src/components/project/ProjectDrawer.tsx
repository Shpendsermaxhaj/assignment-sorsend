import React, { useEffect } from 'react';
import { Spin, Typography } from 'antd';
import { useProjectDrawer } from '@/hooks/project/useProjectDrawer';
import BaseDrawer from '@/components/common/BaseDrawer';

interface ProjectDrawerProps {
  projectId: string | null;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ projectId, open, onClose, children }) => {
  const {
    projectDetails,
    drawerLoading,
    openDrawer,
    closeDrawer,
  } = useProjectDrawer();

  useEffect(() => {
    if (open && projectId) {
      openDrawer(projectId);
    } else if (!open) {
      closeDrawer();
    }
  }, [open, projectId, openDrawer, closeDrawer]);

  return (
    <BaseDrawer
      title={projectDetails?.name || 'Project Details'}
      open={open}
      onClose={onClose}
      width={700}
    >
      {drawerLoading ? (
        <Spin />
      ) : projectDetails ? (
        <div>
          <Typography.Text type="secondary">{projectDetails.description}</Typography.Text>
          {children}
        </div>
      ) : (
        <div>No project details found.</div>
      )}
    </BaseDrawer>
  );
};

export default ProjectDrawer; 