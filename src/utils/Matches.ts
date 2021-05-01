import { MatchTypes } from '../types';

export const removeDeniedRankings = (
    matches: MatchTypes.Match[],
    deniedRankingIds: Set<string>,
): MatchTypes.Match[] => {
    return matches.map((match) => removeDeniedRankingsFromMatch(match, deniedRankingIds));
};

export const removeDeniedRankingsFromMatch = (
    match: MatchTypes.Match,
    deniedRankingIds: Set<string>,
): MatchTypes.Match => ({
    ...match,
    matches: match.matches.filter((ranking) => !deniedRankingIds.has(ranking.id)),
});

export const removeApprovedFromMatches = (matches: MatchTypes.Match[], approvedUserIds: Set<string>) => {
    return matches.filter((match) => !approvedUserIds.has(match.user.id));
};
