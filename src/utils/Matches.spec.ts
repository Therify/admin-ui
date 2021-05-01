import { MatchTypes } from '../types';
import { mockMatch } from '../store/mocks';
import { removeDeniedRankings, removeDeniedRankingsFromMatch } from './Matches';

describe('matchesSelectorHelper', () => {
    const deniedId = 'deny-me';
    const mockDeniedRanking = { id: deniedId } as MatchTypes.Ranking;
    const mockGoodRanking = { id: 'not-denied' } as MatchTypes.Ranking;
    const deniedIdsSet = new Set([deniedId]);
    const mockMatchWithRankings = {
        ...mockMatch,
        matches: [mockDeniedRanking, mockGoodRanking],
    };
    describe('removeDeniedRankings', () => {
        it('should filter out denied rankings for each match in array', () => {
            const matches: MatchTypes.Match[] = [mockMatchWithRankings, mockMatchWithRankings];
            expect(removeDeniedRankings(matches, deniedIdsSet)).toStrictEqual([
                {
                    ...mockMatch,
                    matches: [mockGoodRanking],
                },
                {
                    ...mockMatch,
                    matches: [mockGoodRanking],
                },
            ]);
        });
    });

    describe('removeDeniedRankingsFromMatch', () => {
        it('should filter out ranking when id is in deniedRankingIds', () => {
            expect(removeDeniedRankingsFromMatch(mockMatchWithRankings, deniedIdsSet)).toStrictEqual({
                ...mockMatch,
                matches: [mockGoodRanking],
            });
        });
    });
});
