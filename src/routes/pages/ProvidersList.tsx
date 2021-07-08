import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, List, ListItemIcon, ListItem, useTheme, Button, CircularProgress, IconButton } from '@material-ui/core';
import { Person as PersonIcon, Add as AddIcon, CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import {
    Header1,
    TextSmall,
    NavDrawerPage,
    Divider,
    Navigation,
    SearchBar,
    SelectGroup,
    Text,
    SelectConfig,
} from '../../components';
import { useProvidersApi } from '../../hooks/useProvidersApi';
import { MatchTypes } from '../../types';

export const Providers = () => {
    const theme = useTheme();
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPractice, setSelectedPractice] = useState('all');
    const { getProviders, providers, isLoadingProviders, getProvidersError } = useProvidersApi({ withAlerts: true });
    const [filteredProviders, setFilteredProviders] = useState(providers);
    const practices = new Set(providers.map(({ nameOfPractice }) => nameOfPractice));
    const selectConfigs: SelectConfig[] = [
        {
            options: [
                { value: 'all', text: 'All practices' },
                ...Array.from(practices, (nameOfPractice) => ({
                    value: nameOfPractice ?? 'Not with a practice',
                    text: nameOfPractice ?? 'Not with a practice',
                })),
            ],
            id: 'name-of-practice',
            name: 'Name of Practice Select',
            selectedValue: selectedPractice,
            onChange: setSelectedPractice,
        },
    ];
    useEffect(() => {
        getProviders();
    }, []);
    useEffect(() => {
        const filteredProviders = providers.reduce<MatchTypes.Provider[]>((acc, provider) => {
            const conditions = [
                searchTerm === '' ||
                    `${provider.firstName} ${provider.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()),
                selectedPractice === 'all' || provider.nameOfPractice === selectedPractice,
            ];
            if (conditions.every((status) => status === true)) {
                acc.push(provider);
            }
            return acc;
        }, []);
        setFilteredProviders(filteredProviders);
    }, [selectedPractice, searchTerm, providers]);
    const ErrorContent = getProvidersError ? (
        <Box
            display="flex"
            padding={theme.spacing(1)}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <Text>Something went wrong: {getProvidersError}</Text>
            <Button onClick={() => getProviders()}>Try again</Button>
        </Box>
    ) : undefined;
    const LoadingContent = isLoadingProviders ? (
        <Box display="flex" padding={theme.spacing(1)} justifyContent="center" alignItems="center">
            <CircularProgress color="primary" />
        </Box>
    ) : undefined;

    const EmptyFilterContent =
        filteredProviders.length === 0 && providers.length > 0 ? (
            <Text style={{ margin: theme.spacing(2, 0) }}>No providers match your filter.</Text>
        ) : undefined;
    return (
        <NavDrawerPage drawer={Navigation}>
            <Box style={{ padding: theme.spacing(3, 6, 0, 6) }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header1>Providers</Header1>
                    <IconButton onClick={() => history.push('/providers/upload')}>
                        <CloudUploadIcon />
                    </IconButton>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={3}>
                    <SelectGroup configs={selectConfigs} />
                    <Box display="flex" alignItems="center">
                        <SearchBar
                            label="Search for matches"
                            value={searchTerm}
                            onChange={(val: string) => setSearchTerm(val.trim())}
                            onClear={() => setSearchTerm('')}
                            style={{ marginRight: theme.spacing(1) }}
                        />
                        <Button onClick={() => history.push('/providers/create')}>
                            Add new <AddIcon />
                        </Button>
                    </Box>
                </Box>
                <Divider margin={`${theme.spacing(2)}px 0 0`} />
                {ErrorContent ?? LoadingContent ?? EmptyFilterContent ?? (
                    <List
                        component="nav"
                        aria-labelledby="site-navigation"
                        style={{
                            padding: 0,
                            background: theme.palette.background.paper,
                            marginTop: theme.spacing(4),
                        }}
                    >
                        {filteredProviders.map((provider) => (
                            <ListItem key={provider.id} button style={{ padding: 0 }}>
                                <Link
                                    to={`/providers/${provider.id}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        padding: '8px 16px',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <Text color="textSecondary">{`${provider.lastName}, ${provider.firstName}`}</Text>
                                    {provider.nameOfPractice && (
                                        <TextSmall color="textSecondary" style={{ marginLeft: theme.spacing(2) }}>
                                            {provider.nameOfPractice}
                                        </TextSmall>
                                    )}
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </NavDrawerPage>
    );
};
