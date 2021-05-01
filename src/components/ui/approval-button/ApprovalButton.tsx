import { Box, CircularProgress, useTheme } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { SuccessButton, TextSmall, Text } from '../../ui';

export type ApprovalButtonProps = {
    onApprove: () => Promise<unknown>;
    onCancel?: () => void;
    timeoutInMs?: number;
    buttonText?: string;
    isHidden?: boolean;
};
const Loader = ({
    timeoutInMs,
    onTimerComplete,
    onCancel,
}: {
    timeoutInMs?: number;
    onTimerComplete: () => void;
    onCancel?: () => void;
}) => {
    const theme = useTheme();

    const [progress, setProgress] = useState(1);
    const timeout = timeoutInMs ?? 3000;
    const progressPerSecond = 100 / (timeout / 1000);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress((prevProgress) => {
                const nextProgress = prevProgress + progressPerSecond;
                if (nextProgress >= 100) {
                    clearInterval(intervalId);
                }
                return nextProgress;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [onTimerComplete, progressPerSecond]);
    if (progress >= 100) {
        onTimerComplete();
    }
    const undoApprove = () => {
        if (onCancel) {
            onCancel();
        }
    };
    return (
        <Box display="flex" alignContent="center" onClick={undoApprove}>
            <CircularProgress
                color="secondary"
                variant="determinate"
                value={progress}
                style={{ height: '16px', width: '16px' }}
            />
            <TextSmall style={{ margin: 0, marginLeft: theme.spacing(1), cursor: 'pointer' }}>Undo</TextSmall>
        </Box>
    );
};

const RequestHandlerUi = ({ handleApprove }: { handleApprove: () => Promise<void> }) => {
    const theme = useTheme();
    useEffect(() => {
        const approveFn = async () => {
            await handleApprove();
        };
        approveFn();
    }, []);
    return (
        <Box display="flex" alignContent="center">
            <CircularProgress color="primary" style={{ height: '16px', width: '16px' }} />
            <TextSmall style={{ margin: 0, marginLeft: theme.spacing(1) }}>Approving...</TextSmall>
        </Box>
    );
};

const ErrorState = ({ onClose }: { onClose: () => void }) => {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();
    useEffect(() => {
        setTimeoutId(
            setTimeout(() => {
                onClose();
                if (timeoutId) clearTimeout(timeoutId);
            }, 3000),
        );
    }, []);
    return (
        <Close
            color="error"
            onClick={() => {
                if (timeoutId) clearTimeout(timeoutId);
                onClose();
            }}
        />
    );
};
export const ApprovalButton = ({
    onApprove,
    onCancel,
    timeoutInMs,
    buttonText = 'Approve',
    isHidden,
}: ApprovalButtonProps) => {
    // TODO: fix Warning: Cannot update a component (`ApprovalButton`) while rendering a different component (`Loader`)
    const theme = useTheme();
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isTimerExpired, setIsTimerExpired] = useState(false);
    const startCountdown = () => {
        if (isHidden) return;
        setIsCountingDown(true);
    };
    const handleApprove = async () => {
        setIsCountingDown(true);
        setIsError(false);
        try {
            await onApprove();
            setIsCompleted(true);
        } catch (e) {
            setIsError(true);
            setIsTimerExpired(false);
        }
        setIsCountingDown(false);
    };
    const handleCancel = () => {
        setIsCountingDown(false);
        if (onCancel) {
            onCancel();
        }
    };
    if (isCompleted) {
        return <Text style={{ color: theme.palette.success.main }}>Approved!</Text>;
    }
    if (isError) {
        return <ErrorState onClose={() => setIsError(false)} />;
    }

    if (isTimerExpired) {
        return <RequestHandlerUi handleApprove={handleApprove} />;
    }

    return (
        <Box aria-disabled={isHidden} style={isHidden ? hiddenStyle : {}}>
            {isCountingDown && (
                <Loader
                    onTimerComplete={() => setIsTimerExpired(true)}
                    onCancel={handleCancel}
                    timeoutInMs={timeoutInMs}
                />
            )}
            {!isCountingDown && (
                <SuccessButton color="secondary" data-testid="approve-button" onClick={startCountdown}>
                    {buttonText}
                </SuccessButton>
            )}
        </Box>
    );
};

const hiddenStyle: React.CSSProperties = {
    opacity: 0,
    pointerEvents: 'none',
};
