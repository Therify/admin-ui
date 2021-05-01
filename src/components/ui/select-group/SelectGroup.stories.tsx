import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { SelectConfig, SelectGroup as SelectGroupUi } from './SelectGroup';

export const SelectGroup: Story = () => {
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');
    const configs: SelectConfig[] = [
        {
            options: [
                { value: '1', text: 'Option 1', key: '1' },
                { value: '2', text: 'Option 2', key: '2' },
                { value: '3', text: 'Option 3', key: '3' },
            ],
            id: 'test1',
            name: 'Filter 1',
            selectedValue: selectedValue1,
            onChange: (val: string) => setSelectedValue1(val),
        },
        {
            options: [
                { value: '1', text: 'Option 1', key: '1' },
                { value: '2', text: 'Option 2', key: '2' },
                { value: '3', text: 'Option 3', key: '3' },
            ],
            id: 'test2',
            name: 'Filter 2',
            selectedValue: selectedValue2,
            onChange: (val: string) => setSelectedValue2(val),
        },
    ];
    return <SelectGroupUi configs={configs} />;
};
export const SelectGroupUiWithName: Story = () => {
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');
    const configs: SelectConfig[] = [
        {
            options: [
                { value: '1', text: 'Option 1', key: '1' },
                { value: '2', text: 'Option 2', key: '2' },
                { value: '3', text: 'Option 3', key: '3' },
            ],
            id: 'test1',
            name: 'Filter 1',
            useNameInDisplay: true,
            selectedValue: selectedValue1,
            onChange: (val: string) => setSelectedValue1(val),
        },
        {
            options: [
                { value: '1', text: 'Option 1', key: '1' },
                { value: '2', text: 'Option 2', key: '2' },
                { value: '3', text: 'Option 3', key: '3' },
            ],
            id: 'test2',
            name: 'Filter 2',
            useNameInDisplay: true,
            selectedValue: selectedValue2,
            label: 'test,',
            onChange: (val: string) => setSelectedValue2(val),
        },
    ];
    return <SelectGroupUi configs={configs} />;
};

export default {
    title: 'Ui/SelectGroup',
} as Meta;
