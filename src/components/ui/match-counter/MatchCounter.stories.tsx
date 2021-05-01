import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MatchCounter as MatchCounterUi } from './MatchCounter';

export const MatchCounter: Story = () => <MatchCounterUi good={0} warnings={0} incompatibilities={0} />;

export const MatchCounterSingles: Story = () => <MatchCounterUi good={1} warnings={1} incompatibilities={1} />;

export default {
    title: 'Ui/MatchCounter',
} as Meta;
