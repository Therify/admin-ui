import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { NavDrawerPage as NavDrawerPageUi } from './NavDrawerPage';

export const NavDrawerPage: Story = () => (
    <NavDrawerPageUi drawer={({ isExpanded }) => <p>{isExpanded ? 'open' : 'closed'}</p>}>
        {<h1>Hello!</h1>}
    </NavDrawerPageUi>
);

export default {
    title: 'Layout/NavDrawerPage',
} as Meta;
