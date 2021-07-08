import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import auth from '../utils/Auth';
import { Login, Matches, Providers, ProviderEditor, CreateProvider, ProviderUploadPage } from './pages';

const ProtectedRoute = ({ component: Component, redirectPath, ...rest }: any) => {
    const handleAuthStatus = (props: Record<string, any>) =>
        auth.isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: redirectPath, state: { from: props.locations } }} />
        );
    return <Route {...rest} render={handleAuthStatus} />;
};

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <Redirect exact from="/" to="/matches" />
            <ProtectedRoute path="/matches" redirectPath="/login" component={Matches} />
            <ProtectedRoute path="/providers" exact redirectPath="/login" component={Providers} />
            <ProtectedRoute path="/providers/create" exact redirectPath="/login" component={CreateProvider} />
            <ProtectedRoute path="/providers/upload" exact redirectPath="/login" component={ProviderUploadPage} />
            <ProtectedRoute path="/providers/:id" redirectPath="/login" component={ProviderEditor} />
            <Route path="/login" component={Login} />
            <Route path="*" component={() => <h1>404</h1>} />
        </Switch>
    </BrowserRouter>
);
