import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Box, Button, useTheme } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { NavDrawerPage, Navigation, ProviderDataForm } from '../../components';
import { useProvidersApi } from '../../hooks/useProvidersApi';
import { MatchTypes } from '../../types';

export const CreateProvider = () => {
    const { spacing } = useTheme();
    const history = useHistory();
    const { createProvider, createdProvider, isCreatingProvider } = useProvidersApi({ withAlerts: true });
    const blankProvider: Partial<MatchTypes.Provider> = {
        emailAddress: '',
        firstName: '',
        lastName: '',
        licensedStates: [],
        acceptedInsurance: [],
        yearsOfExperience: 0,
        gender: 'Male',
        race: [],
        specialties: [],
        therapeuticPractices: [],
        rate: 0,
        license: undefined,
        websiteUrl: undefined,
        nameOfPractice: undefined,
    };
    const handleSubmit = async (provider: Partial<MatchTypes.Provider>) => {
        createProvider({
            ...provider,
        });
    };

    useEffect(() => {
        if (createdProvider?.id) {
            history.replace(`/providers/${createdProvider.id}`);
        }
    }, [createdProvider]);
    return (
        <NavDrawerPage drawer={Navigation}>
            <Box style={{ padding: spacing(3, 6, 0, 6) }}>
                <Box display="flex" alignItems="center">
                    <Button onClick={history.goBack} style={{ marginRight: spacing(2) }}>
                        <ChevronLeft />
                    </Button>
                </Box>
                {blankProvider && (
                    <ProviderDataForm
                        title="New Provider"
                        subtitle="Create a new provider"
                        provider={blankProvider}
                        isSubmitting={isCreatingProvider}
                        onSubmit={handleSubmit}
                    />
                )}
            </Box>
        </NavDrawerPage>
    );
};
