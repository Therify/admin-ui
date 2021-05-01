import React from 'react';
import { therifyTheme } from './components/ui';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { Provider as StoreProvider } from 'react-redux';
import Amplify, { Hub, Logger } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import store from './store';
import './App.css';
import { Router } from './routes';
import { AppNotification } from './components/app-notification';

const withEnvironmentVars = (awsExports: Record<string, any>) => ({
    ...awsExports,
    // aws_cognito_region: process.env.REACT_APP_AWS_REGION,
    // aws_user_pools_id: process.env.REACT_APP_COGNITO_POOLS_ID,
    // aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
});
Amplify.configure(withEnvironmentVars(awsExports));

function App() {
    const logger = new Logger('My-Logger');
    const listener = (data: any) => {
        switch (data.payload.event) {
            case 'signIn':
                console.log(data);
                logger.info('user signed in');
                break;
            case 'signUp':
                logger.info('user signed up');
                break;
            case 'signOut':
                logger.info('user signed out');
                break;
            case 'signIn_failure':
                logger.error('user sign in failed');
                break;
            case 'tokenRefresh':
                logger.info('token refresh succeeded');
                break;
            case 'tokenRefresh_failure':
                logger.error('token refresh failed');
                break;
            case 'configured':
                logger.info('the Auth module is configured');
        }
    };

    Hub.listen('auth', listener);
    return (
        <ThemeProvider theme={therifyTheme}>
            <StoreProvider store={store}>
                <CssBaseline />
                <Router />
                <AppNotification />
            </StoreProvider>
        </ThemeProvider>
    );
}

export default withAuthenticator(App);
