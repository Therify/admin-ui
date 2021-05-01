import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { SearchBar as SearchBarUi } from './SearchBar';

export const SearchBar: Story = () => {
    const [searchTerm, setSearchterm] = useState('');
    return <SearchBarUi label="storybook input" value={searchTerm} onChange={(val) => setSearchterm(val)} />;
};
export const SearchBarWithClear: Story = () => {
    const [searchTerm, setSearchterm] = useState('');
    return (
        <SearchBarUi
            label="storybook input"
            value={searchTerm}
            onChange={(val) => setSearchterm(val)}
            onClear={() => setSearchterm('')}
        />
    );
};

export default {
    title: 'Ui/SearchBar',
} as Meta;
