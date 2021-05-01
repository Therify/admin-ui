import React, { useEffect, useState } from 'react';
import { Box, Grid, Theme, useTheme, withStyles } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
const isExpandedStorageKey = 'theriy:is-nav-drawer-expanded';
const expandedWidth = '240px';
const collapsedWidth = '60px';
const transition = '300ms';
export type NavDrawerPageProps = {
    drawer: React.FC<{ isExpanded: boolean }>;
    children: React.ReactNode;
    style?: React.CSSProperties;
};

export const NavDrawerPage = ({ drawer: Drawer, children, style }: NavDrawerPageProps) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(true);
    const width = isExpanded ? expandedWidth : collapsedWidth;
    const Expander = makeExpanderIcon(theme)(ExpanderIcon);

    useEffect(() => {
        const isExpandedState = localStorage.getItem(isExpandedStorageKey);
        setIsExpanded(!(isExpandedState === 'false'));
    }, []);

    useEffect(() => {
        localStorage.setItem(isExpandedStorageKey, String(isExpanded));
    }, [isExpanded]);

    return (
        <Grid container style={{ flexWrap: 'nowrap' }}>
            <Box
                height="100vh"
                overflow="auto"
                display="flex"
                flexDirection="column"
                style={{
                    overflowX: 'hidden',
                    transition,
                    background: theme.palette.background.paper,
                    width,
                }}
            >
                <Box flexGrow={1}>{<Drawer isExpanded={isExpanded} />}</Box>
                <Expander isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
            </Box>
            <Box
                flexGrow={1}
                height="100vh"
                overflow="auto"
                maxWidth={`calc(100vw - ${width})`}
                style={{
                    background: theme.palette.background.default,
                    overflowX: 'hidden',
                    transition,
                    ...style,
                }}
            >
                {children}
            </Box>
        </Grid>
    );
};

const ExpanderIcon = ({ onClick, isExpanded }: { onClick: () => void; isExpanded: boolean }) => {
    const transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
    const theme = useTheme();
    return (
        <Box
            onClick={onClick}
            style={{
                padding: theme.spacing(1),
                display: 'flex',
                transition,
                cursor: 'pointer',
                justifyContent: isExpanded ? 'flex-end' : 'center',
            }}
        >
            <ChevronRight style={{ transform, transition }} />
        </Box>
    );
};

const makeExpanderIcon = (theme: Theme) =>
    withStyles({
        root: {
            opacity: 0.2,
            cursor: 'pointer',
            margin: 0,
            transition,
            '&:hover': {
                opacity: 1,
                '& svg': {
                    fill: theme.palette.secondary.main,
                },
            },
        },
    });
