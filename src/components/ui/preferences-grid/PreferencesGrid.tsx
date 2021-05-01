import React from 'react';
import { Grid } from '@material-ui/core';
import { TextSmall } from '../../ui';

export type PreferencesGridProps = {
    stateOfResidence: string;
    genderPreference: string;
    racePreference: string;
    issues: string;
    insuranceProvider: string;
};

export const PreferencesGrid = ({
    stateOfResidence,
    genderPreference,
    racePreference,
    issues,
    insuranceProvider,
}: PreferencesGridProps) => {
    return (
        <Grid container>
            <Grid item xs={12} sm={4}>
                <TextSmall style={{ flexGrow: 3 }}>
                    <b>State: </b>
                    {stateOfResidence}
                </TextSmall>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextSmall style={{ flexGrow: 3 }}>
                    <b>Gender: </b>
                    {genderPreference}
                </TextSmall>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextSmall style={{ flexGrow: 3 }}>
                    <b>specialties: </b>
                    {issues}
                </TextSmall>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextSmall style={{ flexGrow: 3 }}>
                    <b>Network: </b>
                    {insuranceProvider}
                </TextSmall>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextSmall style={{ flexGrow: 3 }}>
                    <b>Race: </b>
                    {racePreference}
                </TextSmall>
            </Grid>
        </Grid>
    );
};
