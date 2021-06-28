import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, useTheme } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { NavDrawerPage, Navigation, ProviderDataForm, Text } from '../../components';
import { MatchTypes } from '../../types';
import { useProvidersApi } from '../../hooks/useProvidersApi';

export const ProviderEditor = () => {
    const theme = useTheme();
    const history = useHistory();
    const params = useParams<{ id: string }>();
    const {
        getProviderById,
        provider,
        getProviderError,
        isLoadingProvider,
        updateProvider,
        isUpdatingProvider,
    } = useProvidersApi({ withAlerts: true });
    const handleSubmit = async (provider: Partial<MatchTypes.Provider>) => {
        updateProvider({
            ...provider,
            id: params.id,
        });
    };
    const fetchProvider = () => {
        if (params.id) {
            getProviderById(params.id);
        }
    };
    useEffect(fetchProvider, []);
    const ErrorContent = getProviderError ? (
        <Box
            display="flex"
            padding={theme.spacing(1)}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <Text>Something went wrong: {getProviderError}</Text>
            <Button onClick={fetchProvider}>Try again</Button>
        </Box>
    ) : undefined;
    const LoadingContent = isLoadingProvider ? (
        <Box display="flex" padding={theme.spacing(1)} justifyContent="center" alignItems="center">
            <CircularProgress color="primary" />
        </Box>
    ) : undefined;
    return (
        <NavDrawerPage drawer={Navigation}>
            <Box style={{ padding: theme.spacing(3, 6, 0, 6) }}>
                <Box display="flex" alignItems="center">
                    <Button onClick={() => history.goBack()} style={{ marginRight: theme.spacing(2) }}>
                        <ChevronLeft />
                    </Button>
                </Box>
                {ErrorContent ??
                    LoadingContent ??
                    (provider && (
                        <ProviderDataForm
                            provider={provider}
                            isSubmitting={isUpdatingProvider}
                            onSubmit={handleSubmit}
                        />
                    ))}
            </Box>
        </NavDrawerPage>
    );
};
