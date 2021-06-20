import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, useTheme } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { NavDrawerPage, Navigation, ProviderDataForm } from '../../components';
import { mockProvider } from '../../types/mocks';
import { MatchTypes } from '../../types';

export const ProviderEditor = () => {
    const theme = useTheme();
    const history = useHistory();
    const provider = mockProvider;
    const handleSubmit = async (provider: MatchTypes.Provider) => console.log({ updatedProvider: provider });
    return (
        <NavDrawerPage drawer={Navigation}>
            <Box style={{ padding: theme.spacing(3, 6, 0, 6) }}>
                <Box display="flex" alignItems="center">
                    <Button onClick={() => history.goBack()} style={{ marginRight: theme.spacing(2) }}>
                        <ChevronLeft />
                    </Button>
                </Box>

                <ProviderDataForm provider={provider} isSubmitting={false} onSubmit={handleSubmit} />
            </Box>
        </NavDrawerPage>
    );
};
