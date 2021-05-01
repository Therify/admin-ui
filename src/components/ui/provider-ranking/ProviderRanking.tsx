import { Box, Theme, useTheme, withStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { MatchTypes } from '../../../types';
import React from 'react';
import { Text, TextSmall, TextBold } from '../../ui';

export type ProviderRankingProps = {
    id: string;
    status: MatchTypes.RankingStatus;
    rank?: number;
    displayText: string;
    statusText?: string;
    onApprove?: (rankingId: string) => Promise<unknown>;
    onCancel?: () => void;
    onDelete?: (rankingId: string) => void;
};
const getStatusColor = ({ theme, status }: { status: MatchTypes.RankingStatus; theme: Theme }) => {
    switch (status) {
        case MatchTypes.RankingStatus.WARNING:
            return {
                backgroundColor: theme.palette.warning.light,
                textColor: theme.palette.warning.main,
            };
        case MatchTypes.RankingStatus.INCOMPATIBLE:
            return {
                backgroundColor: theme.palette.error.light,
                textColor: theme.palette.error.main,
            };
        default:
            return {
                backgroundColor: theme.palette.success.light,
                textColor: theme.palette.success.main,
            };
    }
};
export const ProviderRanking = ({ id, status, rank, displayText, statusText, onDelete }: ProviderRankingProps) => {
    const theme = useTheme();
    const { backgroundColor, textColor } = getStatusColor({ theme, status });
    return (
        <RankingWrapper style={{ marginBottom: theme.spacing(1) }}>
            <Box
                style={{
                    ...flexCenter,
                    flexGrow: 1,
                    marginRight: theme.spacing(1),
                    justifyContent: 'space-between',
                    padding: theme.spacing(0.5, 2),
                    background: backgroundColor,
                    borderRadius: theme.shape.borderRadius,
                }}
            >
                <div style={flexCenter}>
                    {rank && <TextSmall style={{ width: theme.spacing(3), margin: 0 }}>{rank}.</TextSmall>}
                    <TextBold style={{ margin: 0 }}>{displayText}</TextBold>
                </div>
                {statusText && <Text style={{ margin: 0, color: textColor }}>{statusText}</Text>}
            </Box>
            {onDelete && (
                <DeleteWithStyles title="Delete this match" className="delete-match" onClick={() => onDelete(id)}>
                    <Delete color="error" fontSize="small" style={{ marginRight: theme.spacing(1) }} />
                </DeleteWithStyles>
            )}
        </RankingWrapper>
    );
};

const flexCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
const DeleteWithStyles = withStyles({
    root: {
        opacity: 0,
        cursor: 'pointer',
        transition: '200ms',
        maxWidth: 0,
        '&:hover': {
            opacity: '1 !important',
        },
    },
})(Box);

const RankingWrapper = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        '&:hover .delete-match': {
            maxWidth: '100px',
            opacity: 0.5,
        },
    },
})(Box);
