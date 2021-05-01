import { MatchTypes } from '../../types';
import { IMatchesAction, MatchesActionType } from '../actions';
export type MatchesStore = {
    matches: Record<string, MatchTypes.Match>;
    // If typeof deniedRankingIds ever changes, be sure to update in helpers and mocks
    deniedRankingIds: Set<string>;
    approvedUserIds: Set<string>;
};
const initialState: MatchesStore = {
    matches: {},
    deniedRankingIds: new Set(),
    approvedUserIds: new Set(),
};

export default function matchesReducer(state = initialState, action: IMatchesAction<unknown>) {
    switch (action.type) {
        case MatchesActionType.SET_MATCHES:
            const { payload: matches } = action as IMatchesAction<MatchTypes.Match[]>;
            const matchesMap = matches.reduce((map, match) => {
                map[match.user.id] = match;
                return map;
            }, {} as Record<string, MatchTypes.Match>);
            return {
                ...state,
                matches: matchesMap,
            };
        case MatchesActionType.SET_MATCH:
            const { payload: match } = action as IMatchesAction<MatchTypes.Match>;
            return {
                ...state,
                matches: {
                    ...state.matches,
                    [match.user.id]: match,
                },
            };
        case MatchesActionType.REMOVE_RANKING_FROM_USER:
            const { payload: rankingId } = action as IMatchesAction<string>;
            return {
                ...state,
                deniedRankingIds: state.deniedRankingIds.add(rankingId),
            };
        case MatchesActionType.SET_APPROVED_USER_MATCHES:
            const { payload: userId } = action as IMatchesAction<string>;
            return {
                ...state,
                approvedUserIds: state.deniedRankingIds.add(userId),
            };

        default:
            return state;
    }
}
