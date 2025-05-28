import { Drawer, DrawerProps } from 'antd';
import React from 'react';

interface BaseDrawerProps extends DrawerProps {
  title: React.ReactNode;
  open: boolean;
  onClose: () => void;
  width?: number;
  children?: React.ReactNode;
}

const BaseDrawer: React.FC<BaseDrawerProps> = ({
  title,
  open,
  onClose,
  width = 700,
  children,
  ...rest
}) => (
  <Drawer
    title={title}
    open={open}
    onClose={onClose}
    width={width}
    destroyOnHidden
    {...rest}
  >
    {children}
  </Drawer>
);

export default BaseDrawer; 