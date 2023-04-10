import React from 'react';
import { Modal as AntdModal } from 'antd';

interface IProps {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onConfirm: () => void;
    onClose: () => void;
}

const Modal: React.FC<IProps> = ({
    isOpen,
    title,
    onConfirm = () => {},
    onClose = () => {},
    children,
}) => {
    return (
        <AntdModal title={title} open={isOpen} onOk={onConfirm} onCancel={onClose} footer={null}>
            {children}
        </AntdModal>
    );
};

export default Modal;
