import React from 'react';
import { Alert as AlertUi } from '../ui';
import { useAlerts } from '../../hooks/useAlerts';

export const AppNotification = () => {
    const { markAlertAsViewed, unreadAlerts } = useAlerts();
    const onDismiss = (id: number) => setTimeout(() => markAlertAsViewed(id), 400);
    return (
        <>
            {unreadAlerts.map((alert) => (
                <AlertUi
                    key={alert.id}
                    message={alert.message}
                    type={alert.type}
                    autoHideDurationInMs={alert.autoHideDurationInMs}
                    positionX="center"
                    positionY="bottom"
                    onDismiss={() => onDismiss(alert.id)}
                />
            ))}
        </>
    );
};
