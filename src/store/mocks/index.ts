import { MatchTypes, Mocks } from '../../types';
import { AlertTypes } from '../../components/ui';
import { Alert, ICreateAlertProps } from '../../models';
import { AlertsStore } from '../reducers/alertsReducer';
import { MatchesStore } from '../reducers/matchesReducer';

export type MockStore = {
    matchesStore: MatchesStore;
    alertsStore: AlertsStore;
};
export const mockAlert: Alert = {
    id: 0,
    isViewed: false,
    message: 'test alert',
    type: AlertTypes.Info,
};
export const mockCreateAlertProps: ICreateAlertProps = {
    message: 'hello',
    type: AlertTypes.Info,
};
export const mockMatch = Mocks.mockModelResult;
export const mockDeniedRankingId = 'i-am-a-denied-ranking-id';
export const mockDeniedRanking = {
    ...Mocks.mockRanking,
    id: mockDeniedRankingId,
};
export const mockDeniedRankingIdsSet = new Set([mockDeniedRankingId]);
export const mockMatchWithDeniedRanking: MatchTypes.Match = {
    ...mockMatch,
    user: { ...mockMatch.user, id: mockDeniedRankingId },
    matches: [...mockMatch.matches, mockDeniedRanking],
};

export const mockStore: {
    matchesStore: MatchesStore;
    alertsStore: AlertsStore;
} = {
    alertsStore: {
        alerts: [],
        idCounter: 1,
    },
    matchesStore: {
        matches: { [mockMatch.user.id]: mockMatch },
        deniedRankingIds: mockDeniedRankingIdsSet,
        approvedUserIds: new Set([]),
    },
};
export const mockUser = {
    firstName: 'Test',
    lastName: 'Jackson',
    email: 'test@j.com',
    id: 'test1234',
    token: 'xxxxxxxxxxxx',
};
