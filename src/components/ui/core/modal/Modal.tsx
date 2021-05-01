import { Dialog, useTheme } from '@material-ui/core';
import React from 'react';
import { Header3 } from '../typography';

export type ModalProps = {
    handleClose: () => void;
    isOpen: boolean;
    children?: React.ReactElement;
    title?: string;
};
export const Modal = ({ handleClose, isOpen, children, title }: ModalProps) => {
    const theme = useTheme();
    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="dialog" style={{ padding: theme.spacing(2) }}>
            <div
                style={{
                    minWidth: '300px',
                    padding: theme.spacing(4),
                }}
            >
                {title && <Header3>{title}</Header3>}
                {children}
            </div>
        </Dialog>
    );
};
