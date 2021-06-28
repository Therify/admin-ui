import { MatchTypes } from '../../types';
import { MatchesStore } from '../reducers/matchesReducer';
import { removeApprovedFromMatches, removeDeniedRankings, removeDeniedRankingsFromMatch } from '../../utils/Matches';

type Store = { matchesStore: MatchesStore };
export const getMatchesState = (store: Store) => store.matchesStore.matches;

export const getAllMatches = (store: Store) => Object.values(getMatchesState(store));

export const getEligibleMatches = (store: Store): MatchTypes.Match[] => {
    const matches = getAllMatches(store);
    const deniedRankingIds = getDeniedRankingIds(store);
    const approvedUserIds = getApprovedUserIds(store);
    const unapprovedMatches = removeApprovedFromMatches(matches, approvedUserIds);
    return removeDeniedRankings(unapprovedMatches, deniedRankingIds);
};
// TODO: Write test case for getApprovedUserMatches
export const getApprovedUserMatches = (store: Store): MatchTypes.Match[] => {
    const matches = getAllMatches(store);
    const approvedUserIds = getApprovedUserIds(store);
    return matches.filter((match) => approvedUserIds.has(match.user.id));
};

export const getAllMatchesForUser = (userId: string) => (store: Store): MatchTypes.Ranking[] => {
    return getMatchesState(store)[userId]?.matches ?? [];
};

export const getEligibleMatchesForUser = (userId: string) => (store: Store): MatchTypes.Ranking[] => {
    const deniedRankingIds = getDeniedRankingIds(store);
    const userMatch = getMatchesState(store)[userId];
    return userMatch ? removeDeniedRankingsFromMatch(userMatch, deniedRankingIds).matches : [];
};

export const getDeniedRankingIds = ({ matchesStore }: Store) => matchesStore.deniedRankingIds;

export const getApprovedUserIds = ({ matchesStore }: Store) => matchesStore.approvedUserIds;
