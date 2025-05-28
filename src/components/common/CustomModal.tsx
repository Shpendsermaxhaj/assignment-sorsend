import { Modal, ModalProps } from "antd";
import React from "react";

interface CustomModalProps extends Omit<ModalProps, 'open' | 'title' | 'onCancel' | 'children' | 'footer' | 'width' | 'destroyOnClose' | 'destroyOnHidden'> {
  open: boolean;
  title: string;
  onCancel: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
  destroyOnHidden?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  title,
  onCancel,
  children,
  footer,
  width = 520,
  destroyOnHidden = true,
  ...rest
}) => (
  <Modal
    open={open}
    title={title}
    onCancel={onCancel}
    footer={footer}
    width={width}
    destroyOnHidden={destroyOnHidden}
    {...rest}
  >
    {children}
  </Modal>
);

export default CustomModal; 