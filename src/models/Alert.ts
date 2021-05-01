import { AlertTypes } from '../components/ui';

export type Alert = ICreateAlertProps & IAlertMeta;

export interface IAlertMeta {
    id: number;
    isViewed: boolean;
}

export interface ICreateAlertProps {
    message: string;
    type: AlertTypes;
    autoHideDurationInMs?: number | null;
}
