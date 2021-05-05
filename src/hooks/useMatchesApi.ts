import { MatchTypes } from '../types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMatchOptions, MatchesApi } from '../api/MatchesApi';
import { removeRankingFromUser, setMatch, setMatches, setUserMatchesApproved } from '../store/actions';
import { getEligibleMatches, getDeniedRankingIds, getMatchesState } from '../store/selectors';
import { removeDeniedRankingsFromMatch } from '../utils/Matches';
import { useAlerts } from './useAlerts';

type MatchesApiConfig = { withAlerts?: boolean; withEvents?: boolean };
export const useMatchesApi = (config?: MatchesApiConfig) => ({
    ...useGetMatches(config),
    ...useApproveMatch(config),
    ...useDenyMatch(config),
    ...useCreateRanking(config),
    ...useGetProviders(config),
});

export const useGetMatches = (config?: MatchesApiConfig) => {
    const { createErrorAlert } = useAlerts();
    const [isLoadingMatches, setIsLoadingMatches] = useState(false);
    const [getMatchesError, setGetMatchesError] = useState<string | undefined>(undefined);
    const dispatch = useDispatch();
    const matches = useSelector(getEligibleMatches);
    // const token = useSelector(getUserToken);
    const getMatches = async () => {
        setIsLoadingMatches(true);
        setGetMatchesError(undefined);
        try {
            const results = await MatchesApi.getMatches();
            dispatch(setMatches(results));
        } catch (error) {
            setGetMatchesError(error.message);
            if (config?.withAlerts) createErrorAlert(error.message);
        }
        setIsLoadingMatches(false);
    };
    return {
        matches,
        isLoadingMatches,
        getMatches,
        getMatchesError,
    };
};

export const useApproveMatch = (config?: MatchesApiConfig) => {
    const { createErrorAlert, createSuccessAlert } = useAlerts();
    const [isApprovingMatch, setIsApprovingMatch] = useState(false);
    const [approveMatchError, setApproveMatchError] = useState<string | undefined>(undefined);
    const dispatch = useDispatch();
    const matchesState = useSelector(getMatchesState);
    const deniedRankingIds = useSelector(getDeniedRankingIds);

    const approveMatchesForUser = async (userId: string) => {
        setIsApprovingMatch(true);
        setApproveMatchError(undefined);
        const userMatch = matchesState[userId];
        if (!userMatch) {
            createErrorAlert('Cannot find user');
            return;
        }
        const userMatchIds = removeDeniedRankingsFromMatch(userMatch, deniedRankingIds).matches.map((m) => m.id);
        if (!userMatchIds.length) {
            createErrorAlert('No matches found for user');
            return;
        }
        try {
            await MatchesApi.approveMatches(userMatchIds);
            dispatch(setUserMatchesApproved(userMatch.user.id));
            if (config?.withAlerts) createSuccessAlert(`Approved matches for ${userMatch.user.emailAddress}!`);
        } catch (error) {
            setApproveMatchError(error.message);
            if (config?.withAlerts) createErrorAlert(error.message);
        }
        setIsApprovingMatch(false);
    };

    const bulkApproveMatchesByUserIds = async (userIds: string[]) => {
        setIsApprovingMatch(true);
        setApproveMatchError(undefined);
        const misssingUsers: string[] = [];
        const matchIds = userIds.reduce<string[]>((acc, userId) => {
            const userMatch = matchesState[userId];
            if (!userMatch) {
                misssingUsers.push(userId);
            } else {
                acc = [...acc, ...removeDeniedRankingsFromMatch(userMatch, deniedRankingIds).matches.map((m) => m.id)];
            }
            return acc;
        }, []);

        if (misssingUsers.length > 0) {
            createErrorAlert(`Could not find ${misssingUsers.length}/${userIds.length} find users`);
            if (misssingUsers.length === userIds.length) return;
        }

        try {
            await MatchesApi.approveMatches(matchIds);
            userIds.forEach((userId) => {
                if (!misssingUsers.includes(userId)) {
                    dispatch(setUserMatchesApproved(userId));
                }
            });
            if (config?.withAlerts)
                createSuccessAlert(`Approved ${userIds.length - misssingUsers.length}/${userIds.length}!`);
        } catch (error) {
            setApproveMatchError(error.message);
            if (config?.withAlerts) createErrorAlert(error.message);
        }
        setIsApprovingMatch(false);
    };
    return {
        approveMatchesForUser,
        bulkApproveMatchesByUserIds,
        isApprovingMatch,
        approveMatchError,
    };
};

export const useDenyMatch = (config?: MatchesApiConfig) => {
    const { createErrorAlert } = useAlerts();
    const dispatch = useDispatch();
    const [isDenyingMatch, setIsDenyingMatch] = useState(false);
    const [denyMatchError, setDenyMatchError] = useState<string | undefined>(undefined);

    const denyMatch = async (matchId: string) => {
        setIsDenyingMatch(true);
        setDenyMatchError(undefined);
        try {
            await MatchesApi.denyMatch(matchId);
            dispatch(removeRankingFromUser(matchId));
        } catch (error) {
            setDenyMatchError(error.message);
            if (config?.withAlerts) createErrorAlert(error.message);
        }
        setIsDenyingMatch(false);
    };
    return {
        denyMatch,
        isDenyingMatch,
        denyMatchError,
    };
};

export const useCreateRanking = (config?: MatchesApiConfig) => {
    const { createErrorAlert, createSuccessAlert } = useAlerts();
    const [isCreatingRanking, setIsCreatingRanking] = useState(false);
    const [createRankingError, setCreateRankingError] = useState<string | undefined>(undefined);
    const dispatch = useDispatch();
    const matches = useSelector(getMatchesState);

    const createRanking = async ({ userId, providerId }: createMatchOptions) => {
        setIsCreatingRanking(true);
        setCreateRankingError(undefined);
        try {
            const newRanking = await MatchesApi.createMatch({ userId, providerId });
            const match = matches[userId];
            if (match) {
                dispatch(
                    setMatch({
                        ...match,
                        matches: [...match.matches, newRanking],
                    }),
                );
                if (config?.withAlerts) createSuccessAlert('Successfully created match!');
            } else {
                throw new Error(`[createRanking]: Can not find match with user id ${userId}`);
            }
        } catch (error) {
            setCreateRankingError(error.message);
            if (config?.withAlerts) createErrorAlert(error.message);
        }
        setIsCreatingRanking(false);
    };
    return {
        createRanking,
        isCreatingRanking,
        createRankingError,
    };
};

export const useGetProviders = (config?: MatchesApiConfig) => {
    const { createErrorAlert } = useAlerts();
    const [providers, setProviders] = useState<MatchTypes.Provider[]>([]);
    const [isLoadingProviders, setIsLoadingProviders] = useState(false);
    const [getProvidersError, setGetProvidersError] = useState<string | undefined>(undefined);
    const getProviders = async (queryParams: Record<string, string> | undefined = {}) => {
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        const query = queryString === '' ? '' : `?${queryString}`;
        setGetProvidersError(undefined);
        setIsLoadingProviders(true);
        try {
            const results = await MatchesApi.getProviders(query);
            setProviders(results);
        } catch (error) {
            setGetProvidersError(error.message);
            if (config?.withAlerts) createErrorAlert(error.message);
        }
        setIsLoadingProviders(false);
    };
    return { providers, getProviders, isLoadingProviders, getProvidersError };
};
