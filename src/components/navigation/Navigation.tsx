import React from 'react';
import { useTheme, Box, ListItem, ListItemIcon, List } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { HowToReg, People } from '@material-ui/icons';
import { Header2, Text } from '../ui';
import { useSelector } from 'react-redux';
import { getUserFirstName } from '../../store/selectors';

export type NavigationProps = {
    isExpanded: boolean;
};
const isCurrentPath = (path: string, currentPath: string) =>
    path === '/' ? currentPath === path : currentPath.startsWith(path);

export const Navigation = ({ isExpanded }: NavigationProps) => {
    const theme = useTheme();
    const { pathname } = useLocation();
    const name = useSelector(getUserFirstName);

    return (
        <>
            <Box
                margin="auto"
                textAlign="center"
                style={{
                    marginTop: theme.spacing(4),
                    padding: isExpanded ? theme.spacing(4, 3, 0, 3) : theme.spacing(4, 0.5, 0, 0.5),
                }}
            >
                {/* TODO: Switch styles with delay isntead of scaling up and down */}
                <img width="50%" src="/therify-icon-192.png" alt="Therify logo" />
            </Box>
            {isExpanded && (
                <Header2 style={{ textAlign: 'center', padding: theme.spacing(3) }}>Hello, {name || 'user'}</Header2>
            )}

            <List
                component="nav"
                aria-labelledby="site-navigation"
                style={{
                    border: '1px solid rgba(0,0,0,.1)',
                    borderLeft: 'none',
                    borderRight: 'none',
                    marginTop: theme.spacing(4),
                }}
            >
                {navLinkList.map(({ path, displayText, Icon, isDisabled, title }) => {
                    const isActive = isCurrentPath(path, pathname);
                    return (
                        <ListItem key={path} disabled={isDisabled} button style={{ padding: 0 }} title={title}>
                            <Link
                                to={path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    padding: '8px 16px',
                                    textDecoration: 'none',
                                }}
                            >
                                <ListItemIcon>{<Icon color={isActive ? 'primary' : 'action'} />}</ListItemIcon>
                                {isExpanded && (
                                    <Text
                                        color={isActive ? 'primary' : 'textSecondary'}
                                        style={{ fontWeight: isActive ? 500 : 400, margin: 0 }}
                                    >
                                        {displayText}
                                    </Text>
                                )}
                            </Link>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};

type NavLinkConfig = {
    path: string;
    displayText: string;
    isDisabled?: boolean;
    title?: string;
    Icon: (props: Record<string, any>) => JSX.Element;
};
const navLinkList: NavLinkConfig[] = [
    {
        path: '/matches',
        displayText: 'Matches',
        Icon: People,
        title: 'Approve and deny model rankings',
    },
    {
        path: '/providers',
        displayText: 'Providers',
        Icon: HowToReg,
        title: 'Coming soon!',
        isDisabled: true,
    },
];
