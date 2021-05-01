import { useDispatch, useSelector } from 'react-redux';
import { AlertTypes } from '../components/ui';
import { setAlert, setAlertViewed } from '../store/actions';
import { getAlerts as getAlertsSelector, getUnreadAlerts as getUnreadAlertsSelector } from '../store/selectors';
import { ICreateAlertProps } from '../models';

export const useAlerts = () => {
    const dispatch = useDispatch();
    const alerts = useSelector(getAlertsSelector);
    const unreadAlerts = useSelector(getUnreadAlertsSelector);

    const createAlert = (alertConfig: ICreateAlertProps) => dispatch(setAlert(alertConfig));

    const createSuccessAlert = (message: string, autoHideDurationInMs?: number | null) =>
        createAlert({
            message,
            autoHideDurationInMs,
            type: AlertTypes.Success,
        });
    const createWarningAlert = (message: string, autoHideDurationInMs?: number | null) =>
        createAlert({
            message,
            autoHideDurationInMs,
            type: AlertTypes.Warning,
        });
    const createErrorAlert = (message: string, autoHideDurationInMs?: number | null) =>
        createAlert({
            message: message ?? 'An unexpected error occured',
            autoHideDurationInMs,
            type: AlertTypes.Error,
        });
    const createInfoAlert = (message: string, autoHideDurationInMs?: number | null) =>
        createAlert({
            message,
            autoHideDurationInMs,
            type: AlertTypes.Info,
        });

    const markAlertAsViewed = (id: number) => dispatch(setAlertViewed(id));

    return {
        createSuccessAlert,
        createWarningAlert,
        createErrorAlert,
        createInfoAlert,
        markAlertAsViewed,
        alerts,
        unreadAlerts,
    };
};
