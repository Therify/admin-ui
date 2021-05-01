import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
export enum AlertTypes {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
}

export type AlertProps = {
    message: string;
    type?: AlertTypes;
    positionY?: 'top' | 'bottom';
    positionX?: 'left' | 'center' | 'right';
    autoHideDurationInMs?: number | null;
    onDismiss?: () => void;
};

export const Alert = ({
    message,
    type = AlertTypes.Info,
    positionX = 'center',
    positionY = 'bottom',
    autoHideDurationInMs = 6000,
    onDismiss,
}: AlertProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
        if (onDismiss) onDismiss();
    };
    return (
        <Snackbar
            anchorOrigin={{
                vertical: positionY,
                horizontal: positionX,
            }}
            color={type}
            open={isOpen}
            autoHideDuration={autoHideDurationInMs}
            onClose={handleClose}
            style={{ maxWidth: '360px' }}
        >
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={type}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
};
