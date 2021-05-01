import { AlertsStore } from '../reducers/alertsReducer';

type Store = { alertsStore: AlertsStore };
export const getAlerts = ({ alertsStore }: Store) => alertsStore.alerts;

export const getUnreadAlerts = ({ alertsStore }: Store) => alertsStore.alerts.filter((a) => a.isViewed === false);
