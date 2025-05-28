import CustomModal from '@/components/common/CustomModal';
import PrimaryButton from '@/components/common/PrimaryButton';

interface DeleteTaskModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteTaskModal({ open, onConfirm, onCancel }: DeleteTaskModalProps) {
  return (
    <CustomModal open={open} title="Delete Task" onCancel={onCancel} footer={null}>
      <div>Are you sure you want to delete this task?</div>
      <div className="flex justify-end gap-2 mt-6">
        <PrimaryButton onClick={onCancel}>Cancel</PrimaryButton>
        <PrimaryButton style={{ backgroundColor: '#ff4d4f' }} onClick={onConfirm}>Delete</PrimaryButton>
      </div>
    </CustomModal>
  );
} 