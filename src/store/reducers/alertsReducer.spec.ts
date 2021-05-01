import { mockStore, mockCreateAlertProps } from '../mocks';
import { setAlert, setAlertViewed, AlertsActionType } from '../actions';
import alertsReducer from './alertsReducer';

const { alertsStore: mockState } = mockStore;

describe('alerts reducer', () => {
    it('should return default state', () => {
        const type = '' as AlertsActionType;
        expect(alertsReducer(mockState, { type, payload: undefined })).toStrictEqual(mockState);
    });

    it('should increment idCounter in state when alert added', () => {
        const action = setAlert(mockCreateAlertProps);
        const updatedState = alertsReducer(mockState, action);
        expect(updatedState.idCounter).toBe(mockState.idCounter + 1);
    });

    it('should set a new alert to state', () => {
        const action = setAlert(mockCreateAlertProps);
        const updatedState = alertsReducer(mockState, action);
        expect(updatedState.alerts).toStrictEqual([
            { ...mockCreateAlertProps, isViewed: false, id: mockState.idCounter },
        ]);
    });

    it('should set an alert to `viewed` in state', () => {
        const action = setAlertViewed(0);
        const updatedState = alertsReducer(
            { ...mockState, alerts: [{ ...mockCreateAlertProps, isViewed: false, id: 0 }] },
            action,
        );
        expect(updatedState).toStrictEqual({
            ...mockState,
            alerts: [{ ...mockCreateAlertProps, id: 0, isViewed: true }],
        });
    });
});
