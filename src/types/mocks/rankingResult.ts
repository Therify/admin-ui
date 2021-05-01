import { Match, Ranking } from '../match';
import { mockUser } from './user';
import { mockProvider, mockProvider2, mockProvider3 } from './providers';

export const mockRanking: Ranking = {
    id: 'test789',
    score: 25,
    providerEmailAddress: mockProvider.emailAddress,
    userEmailAddress: mockUser.emailAddress,
    criteria: {},
    provider: mockProvider,
};

export const mockModelResult: Match = {
    user: mockUser,
    matches: [
        {
            ...mockRanking,
            id: 'test1',
        },
        {
            ...mockRanking,
            id: 'test2',
            providerEmailAddress: mockProvider2.emailAddress,
            provider: mockProvider2,
        },
        {
            ...mockRanking,
            id: 'test3',
            providerEmailAddress: mockProvider3.emailAddress,
            provider: mockProvider3,
        },
    ],
};

export const mockModelResultsList: Match[] = [
    { ...mockModelResult, user: { ...mockModelResult.user, id: 'test1' } },
    { ...mockModelResult, user: { ...mockModelResult.user, id: 'test2' } },
    { ...mockModelResult, user: { ...mockModelResult.user, id: 'test3' } },
    { ...mockModelResult, user: { ...mockModelResult.user, id: 'test4' } },
    { ...mockModelResult, user: { ...mockModelResult.user, id: 'test5' } },
];
