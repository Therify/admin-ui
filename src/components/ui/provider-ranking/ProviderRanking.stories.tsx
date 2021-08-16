import React from 'react';
import { MatchTypes } from '../../../types';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ProviderRanking as ProviderRankingUi } from './ProviderRanking';

export const PatientCard: Story = () => {
    return (
        <ProviderRankingUi
            id="test"
            providerId="test"
            onDelete={async () => alert('Deleted!')}
            rank={1}
            displayText="Dr. Test Jenkins"
            status={MatchTypes.RankingStatus.GOOD}
        />
    );
};
export const Warning: Story = () => {
    return (
        <ProviderRankingUi
            id="tests"
            providerId="test"
            rank={1}
            displayText="Dr. Test Jenkins"
            statusText="Gender: Male"
            status={MatchTypes.RankingStatus.WARNING}
            onDelete={async () => alert('Deleted!')}
        />
    );
};
export const Incompatible: Story = () => {
    return (
        <ProviderRankingUi
            id="test"
            providerId="test"
            rank={1}
            displayText="Dr. Test Jenkins"
            statusText="Out of Network"
            status={MatchTypes.RankingStatus.INCOMPATIBLE}
            onDelete={async () => alert('Deleted!')}
        />
    );
};
export const NoDelete: Story = () => {
    return (
        <ProviderRankingUi
            id="test"
            providerId="test"
            rank={1}
            displayText="Dr. Test Jenkins"
            status={MatchTypes.RankingStatus.GOOD}
        />
    );
};

export const NoRank: Story = () => {
    return (
        <ProviderRankingUi
            id="test"
            providerId="test"
            displayText="Dr. Test Jenkins"
            status={MatchTypes.RankingStatus.GOOD}
        />
    );
};

export default {
    title: 'Ui/ProviderRanking',
} as Meta;
