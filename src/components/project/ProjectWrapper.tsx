'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Form } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import CustomModal from '@/components/common/CustomModal';
import { useProjects, Project } from '@/hooks/project/useProjects';
import ProjectList from '@/components/project/ProjectList';
import ProjectDrawer from '@/components/project/ProjectDrawer';
import { useModal } from '@/context/ModalContext';
import ProjectTasks from '@/components/task/ProjectTasks';
import PrimaryButton from '@/components/common/PrimaryButton';
import ProjectForm from '@/components/project/ProjectForm';



interface ProjectWrapperProps {
  initialProjects: Project[];
}

export default function ProjectWrapper({ initialProjects }: ProjectWrapperProps) {
  const { projects, loading, fetchProjects, createProject, updateProject, deleteProject } = useProjects({ initialData: initialProjects });
  const [projectForm] = Form.useForm();
  const [drawerProjectId, setDrawerProjectId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const projectId = searchParams.get('projectId');
    if (projectId) {
      setDrawerProjectId(projectId);
    } else {
      setDrawerProjectId(null);
    }
  }, [searchParams]);

  const handleCreateProject = async (values: any) => {
    const success = await createProject(values);
    if (success) {
      closeModal();
      projectForm.resetFields();
    }
  };

  const handleOpenProjectModal = () => {
    openModal(
      <CustomModal
        open={true}
        title="Create New Project"
        onCancel={closeModal}
        footer={null}
      >
        <ProjectForm
          onSubmit={handleCreateProject}
          loading={loading}
        />
      </CustomModal>
    );
  };

  const handleProjectClick = (project: Project) => {
    router.push(`?projectId=${project.id}`);
  };

  const handleDrawerClose = () => {
    setDrawerProjectId(null);
    router.push('/');
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <PrimaryButton
          icon={<PlusOutlined />}
          onClick={handleOpenProjectModal}
        >
          New Project
        </PrimaryButton>
      </div>
      <ProjectList
        projects={projects}
        loading={loading}
        onProjectClick={handleProjectClick}
        updateProject={updateProject}
        deleteProject={deleteProject}
        fetchProjects={fetchProjects}
      />
      <ProjectDrawer
        projectId={drawerProjectId}
        open={!!drawerProjectId}
        onClose={handleDrawerClose}
      >
        {drawerProjectId && (
          <ProjectTasks
            projectId={drawerProjectId}
            projectName={projects.find(p => p.id === drawerProjectId)?.name || ''}
            onTaskCreated={fetchProjects}
          />
        )}
      </ProjectDrawer>
    </>
  );
} 