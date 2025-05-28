import CustomModal from '@/components/common/CustomModal';
import type { Project } from '@/hooks/project/useProjects';
import PrimaryButton from '@/components/common/PrimaryButton';

interface DeleteProjectModalProps {
  open: boolean;
  project: Project | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteProjectModal({ open, project, onConfirm, onCancel }: DeleteProjectModalProps) {
  if (!project) return null;
  return (
    <CustomModal open={open} title="Delete Project" onCancel={onCancel} footer={null}>
      <div>Are you sure you want to delete this project?</div>
      <div className="flex justify-end gap-2 mt-6">
        <PrimaryButton onClick={onCancel}>Cancel</PrimaryButton>
        <PrimaryButton style={{ backgroundColor: '#ff4d4f' }} onClick={onConfirm}>Delete</PrimaryButton>
      </div>
    </CustomModal>
  );
} 