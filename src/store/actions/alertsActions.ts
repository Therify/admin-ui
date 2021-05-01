import { ICreateAlertProps } from '../../models';

export interface IAlertsAction<PayloadType> {
    type: AlertsActionType;
    payload: PayloadType;
}
export enum AlertsActionType {
    SET_ALERT = 'SET_ALERT',
    SET_ALERT_VIEWED = 'SET_ALERT_VIEWED',
    REMOVE_ALERT = 'REMOVE_ALERT',
}

export const setAlert = (alert: ICreateAlertProps): IAlertsAction<ICreateAlertProps> => ({
    type: AlertsActionType.SET_ALERT,
    payload: alert,
});

export const setAlertViewed = (alertId: number): IAlertsAction<number> => ({
    type: AlertsActionType.SET_ALERT_VIEWED,
    payload: alertId,
});
export const removeAlert = (rankingId: string): IAlertsAction<string> => ({
    type: AlertsActionType.REMOVE_ALERT,
    payload: rankingId,
});
