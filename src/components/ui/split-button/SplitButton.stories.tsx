import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { SplitButton as SplitButtonUi, SplitButtonOption } from './SplitButton';

const options: SplitButtonOption[] = [
    { value: 'MERGE_COMMIT', text: 'Create a merge commit' },
    { value: 'SQUASH_AND_MERGE', text: 'Squash and merge' },
    { value: 'REBASE_AND_MERGE', text: 'Rebase and merge' },
];
export const SplitButton: Story = () => {
    return <SplitButtonUi options={options} onClick={(option) => console.log(option.value)} />;
};

export default {
    title: 'Ui/SplitButton',
} as Meta;
