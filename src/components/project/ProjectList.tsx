"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import ProjectCard from './ProjectCard';
import SkeletonCard from '@/components/common/SkeletonCard';
import type { ProjectFormValues } from '@/components/project/ProjectForm';
import type { Project } from '@/hooks/project/useProjects';
import EditProjectModal from './EditProjectModal';
import DeleteProjectModal from './DeleteProjectModal';

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  onProjectClick?: (project: Project) => void;
  updateProject: (id: string, values: ProjectFormValues) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  fetchProjects: () => Promise<void>;
}

type ModalType = 'edit' | 'delete' | null;

export default function ProjectList({ projects, loading, onProjectClick, updateProject, deleteProject, fetchProjects }: ProjectListProps) {
  const router = useRouter();
  const [modal, setModal] = useState<{ type: ModalType; project: Project | null }>({ type: null, project: null });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const openModal = (type: ModalType, project: Project) => setModal({ type, project });
  const closeModal = () => setModal({ type: null, project: null });

  const handleEditSubmit = async (values: ProjectFormValues) => {
    if (modal.project) {
      await updateProject(modal.project.id, values);
      closeModal();
      fetchProjects();
    }
  };

  const handleDeleteConfirm = async () => {
    if (modal.project) {
      await deleteProject(modal.project.id);
      closeModal();
      fetchProjects();
    }
  };

  const skeletonCount = projects && projects.length > 0 ? projects.length : 3;
  if (!hydrated || loading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2">
        {[...Array(skeletonCount)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={(p, e) => { e.stopPropagation(); openModal('edit', p); }}
            onDelete={(p, e) => { e.stopPropagation(); openModal('delete', p); }}
            onClick={onProjectClick ? onProjectClick : (p) => router.push(`/projects/${p.id}`)}
          />
        ))}
      </div>
      <EditProjectModal
        open={modal.type === 'edit' && !!modal.project}
        project={modal.project}
        onSubmit={handleEditSubmit}
        onCancel={closeModal}
      />
      <DeleteProjectModal
        open={modal.type === 'delete' && !!modal.project}
        project={modal.project}
        onConfirm={handleDeleteConfirm}
        onCancel={closeModal}
      />
    </>
  );
} 