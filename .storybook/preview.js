import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { therifyTheme } from '../src/components/core/theme';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
    (Story) => (
        <ThemeProvider theme={therifyTheme}>
            <CssBaseline />
            <Story />
        </ThemeProvider>
    ),
];
