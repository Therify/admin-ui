import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, List, ListItemIcon, ListItem, useTheme, InputLabel, FormControl } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { Header1, TextSmall, NavDrawerPage, Divider, Navigation, Text, Input } from '../../components';
import { mockProvider } from '../../types/mocks';

export const ProviderEditor = () => {
    const theme = useTheme();
    const history = useHistory();
    const provider = mockProvider;
    return (
        <NavDrawerPage drawer={Navigation}>
            <Box style={{ padding: theme.spacing(3, 6, 0, 6) }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        <Button onClick={() => history.goBack()} style={{ marginRight: theme.spacing(2) }}>
                            <ChevronLeft />
                        </Button>
                        <Box>
                            <Text>{provider.nameOfPractice}</Text>
                            <Header1>{`${provider.firstName} ${provider.lastName}`}</Header1>
                        </Box>
                    </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={3}>
                    {/* <SelectGroup configs={selectConfigs} /> */}
                </Box>
                <Divider margin={`${theme.spacing(2)}px 0 0`} />

                <FormControl style={{ background: theme.palette.background.paper, width: '50%' }}>
                    {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
                    <Input label="Email Address" aria-describedby="my-helper-text" />
                </FormControl>
            </Box>
        </NavDrawerPage>
    );
};
