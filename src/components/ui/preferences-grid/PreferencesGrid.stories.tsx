import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { PreferencesGrid as PreferencesGridUi } from './PreferencesGrid';
import { Mocks } from '../../../types';

export const PreferencesGrid: Story = () => (
    <PreferencesGridUi
        stateOfResidence={Mocks.mockUser.stateOfResidence}
        genderPreference={Mocks.mockUser.genderPreference}
        racePreference={Mocks.mockUser.racePreference}
        issues={Mocks.mockUser.issues.join(', ')}
        insuranceProvider={Mocks.mockUser.insuranceProvider}
    />
);

export default {
    title: 'Ui/PreferencesGrid',
} as Meta;
