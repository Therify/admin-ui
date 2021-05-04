import React from 'react';
import { useTheme, CircularProgress, Box, withStyles } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { MatchTypes } from '../../types';
import { Text, MatchesCard, ButtonFill as Button } from '../ui';
import { getProviderToUserCompatability } from '../../utils/MatchQuality';

export type MatchesListProps = {
    selectedItemsIds: string[];
    handleApprove: (userId: string) => Promise<void>;
    handleDeleteMatch: (id: string) => void;
    handleCreateMatch: (match: MatchTypes.Match) => void;
    handleRetry?: () => void;
    onCheck: (id: string) => void;
    matches: MatchTypes.Match[];
    isLoading?: boolean;
    errorMessage?: string;
};
export const MatchesList = ({
    selectedItemsIds,
    handleApprove,
    handleDeleteMatch,
    handleCreateMatch,
    handleRetry,
    onCheck,
    isLoading,
    matches,
    errorMessage,
}: MatchesListProps) => {
    const theme = useTheme();

    const matchesWithStatuses = matches.map((match) => ({
        ...match,
        matches: match.matches.map((ranking) => {
            const { status, reasons } = getProviderToUserCompatability({
                user: match.user,
                provider: ranking.provider,
            });
            return {
                ...ranking,
                status,
                statusReason: reasons ? reasons.join(', ') : undefined,
            };
        }),
    }));
    const ErrorContent = errorMessage ? (
        <>
            <Text>Something went wrong: {errorMessage}</Text>
            <Button onClick={handleRetry}>Try again</Button>
        </>
    ) : undefined;
    const LoadingContent = isLoading ? (
        <Box display="flex" padding={theme.spacing(1)} justifyContent="center" alignItems="center">
            <CircularProgress color="primary" />
        </Box>
    ) : undefined;

    const MatchesContent =
        matches.length === 0 ? (
            <Box display="flex" alignItems="center">
                <Text>All caught up. No matches to show!</Text>
                <RefreshWrapper
                    onClick={handleRetry}
                    style={{
                        marginLeft: theme.spacing(0.5),
                        padding: theme.spacing(0.5),
                    }}
                >
                    <Refresh fontSize="small" />
                </RefreshWrapper>
            </Box>
        ) : (
            matchesWithStatuses.map((match) => (
                <MatchesCard
                    key={match.user.id}
                    isChecked={selectedItemsIds.includes(match.user.id)}
                    onCheck={() => onCheck(match.user.id)}
                    user={match.user}
                    rankings={match.matches}
                    handleApprove={() => handleApprove(match.user.id)}
                    handleDeleteMatch={handleDeleteMatch}
                    handleCreateMatch={() => handleCreateMatch(match)}
                />
            ))
        );
    return (
        <Box flexGrow={1} overflow="auto" style={{ padding: theme.spacing(3, 6), paddingBottom: 0 }}>
            {ErrorContent ?? LoadingContent ?? MatchesContent}
        </Box>
    );
};

const RefreshWrapper = withStyles({
    root: {
        display: 'inline-block',
        opacity: 0.5,
        cursor: 'pointer',
        transition: '300ms',
        '&:hover': {
            opacity: 1,
        },
    },
})(Box);
