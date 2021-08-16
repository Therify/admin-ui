import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MatchesCard as MatchesCardUi } from './MatchesCard';
import { Mocks, MatchTypes } from '../../../types';

const mockRankingWithStatus = {
    ...Mocks.mockRanking,
    status: MatchTypes.RankingStatus.GOOD,
};

export const MatchesCard: Story = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <MatchesCardUi
            receivedDate={new Date()}
            isChecked={isChecked}
            onCheck={() => setIsChecked(!isChecked)}
            user={Mocks.mockUser}
            rankings={[
                { ...mockRankingWithStatus, id: '1' },
                { ...mockRankingWithStatus, id: '2' },
                { ...mockRankingWithStatus, id: '3' },
            ]}
            handleApprove={async () => {}}
            handleCreateMatch={() => {}}
            handleDeleteMatch={() => {}}
        />
    );
};
export const NoMatchCreation: Story = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <MatchesCardUi
            receivedDate={new Date()}
            isChecked={isChecked}
            onCheck={() => setIsChecked(!isChecked)}
            user={Mocks.mockUser}
            rankings={[
                { ...mockRankingWithStatus, id: '1' },
                { ...mockRankingWithStatus, id: '2' },
                { ...mockRankingWithStatus, id: '3' },
            ]}
            handleApprove={async () => {}}
            handleDeleteMatch={() => {}}
        />
    );
};

export const NoApprovableMatches: Story = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <MatchesCardUi
            receivedDate={new Date()}
            isChecked={isChecked}
            onCheck={() => setIsChecked(!isChecked)}
            user={Mocks.mockUser}
            rankings={[
                {
                    ...mockRankingWithStatus,
                    status: MatchTypes.RankingStatus.INCOMPATIBLE,
                    id: '1',
                },
                {
                    ...mockRankingWithStatus,
                    status: MatchTypes.RankingStatus.INCOMPATIBLE,
                    id: '2',
                },
                {
                    ...mockRankingWithStatus,
                    status: MatchTypes.RankingStatus.INCOMPATIBLE,
                    id: '3',
                },
            ]}
            handleApprove={async () => {}}
            handleDeleteMatch={() => {}}
        />
    );
};

export const NoMatchesToShow: Story = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <MatchesCardUi
            receivedDate={new Date()}
            isChecked={isChecked}
            onCheck={() => setIsChecked(!isChecked)}
            user={Mocks.mockUser}
            rankings={[]}
            handleApprove={async () => {}}
            handleDeleteMatch={() => {}}
        />
    );
};

export default {
    title: 'Ui/MatchesCard',
} as Meta;
