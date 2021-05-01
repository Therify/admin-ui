import { Box, useTheme } from '@material-ui/core';
import { Text } from '../../ui';
import React from 'react';
export type MatchCounterProps = {
    good: number;
    warnings: number;
    incompatibilities: number;
};

export const MatchCounter = ({ good, warnings, incompatibilities }: MatchCounterProps) => {
    const theme = useTheme();
    return (
        <Box>
            <Text data-testid="match-counter-rankings" display="inline" style={{ marginRight: theme.spacing(2) }}>
                <span style={{ color: theme.palette.success.main }}>{good}</span> ranking
                {good === 1 ? '' : 's'}
            </Text>
            <Text data-testid="match-counter-warnings" display="inline" style={{ marginRight: theme.spacing(2) }}>
                <span style={{ color: theme.palette.warning.main }}>{warnings}</span> warning
                {warnings === 1 ? '' : 's'}
            </Text>
            <Text
                data-testid="match-counter-incompatibilies"
                display="inline"
                style={{ marginRight: theme.spacing(2) }}
            >
                <span style={{ color: theme.palette.error.main }}>{incompatibilities}</span> incompatibilit
                {incompatibilities === 1 ? 'y' : 'ies'}
            </Text>
        </Box>
    );
};
