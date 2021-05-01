import { Alert, ICreateAlertProps } from '../../models';
import { IAlertsAction, AlertsActionType } from '../actions';
export type AlertsStore = {
    alerts: Alert[];
    idCounter: number;
};
const initialState: AlertsStore = {
    idCounter: 1,
    alerts: [],
};

export default function alertsReducer(state = initialState, action: IAlertsAction<any>) {
    switch (action.type) {
        case AlertsActionType.SET_ALERT:
            const { payload: alert } = action as IAlertsAction<ICreateAlertProps>;
            return {
                ...state,
                alerts: [...state.alerts, { ...alert, isViewed: false, id: state.idCounter }],
                idCounter: state.idCounter + 1,
            };

        case AlertsActionType.SET_ALERT_VIEWED:
            const { payload: alertId } = action as IAlertsAction<number>;
            return {
                ...state,
                alerts: state.alerts.map((alert) => {
                    if (alert.id === alertId) {
                        return { ...alert, isViewed: true };
                    }
                    return alert;
                }),
            };
        // TODO: Remove alert
        default:
            return state;
    }
}
