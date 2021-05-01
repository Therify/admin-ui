import { getAlerts, getUnreadAlerts } from './alertsSelector';
import { mockAlert, mockStore } from '../mocks';

describe('alertsSelector', () => {
    describe('getAlerts', () => {
        it('should return alerts array', () => {
            expect(getAlerts(mockStore)).toStrictEqual([]);
        });
    });

    describe('getUnreadAlerts', () => {
        it('should return only unread alerts', () => {
            const store = {
                alertsStore: {
                    ...mockStore.alertsStore,
                    alerts: [
                        { ...mockAlert, id: 0, isViewed: false },
                        { ...mockAlert, id: 1, isViewed: true },
                    ],
                },
            };
            expect(getUnreadAlerts(store)).toStrictEqual([{ ...mockAlert, id: 0, isViewed: false }]);
        });
    });
});
