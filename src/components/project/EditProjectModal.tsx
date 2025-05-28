import CustomModal from '@/components/common/CustomModal';
import ProjectForm, { ProjectFormValues } from './ProjectForm';
import type { Project } from '@/hooks/project/useProjects';

interface EditProjectModalProps {
  open: boolean;
  project: Project | null;
  onSubmit: (values: ProjectFormValues) => void;
  onCancel: () => void;
}

export default function EditProjectModal({ open, project, onSubmit, onCancel }: EditProjectModalProps) {
  if (!project) return null;
  return (
    <CustomModal open={open} title="Edit Project" onCancel={onCancel} footer={null}>
      <ProjectForm
        onSubmit={onSubmit}
        loading={false}
        initialValues={{
          name: project.name,
          description: project.description ?? ''
        }}
        onCancel={onCancel}
        isEdit={true}
      />
    </CustomModal>
  );
} 