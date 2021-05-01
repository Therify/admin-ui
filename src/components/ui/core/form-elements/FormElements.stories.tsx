import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Checkbox as CheckboxUi, Select as SelectUi, SelectOption, Input as InputUi } from './FormElements';

export const Checkbox: Story = () => {
    const [isChecked, setIschecked] = useState(true);
    return <CheckboxUi checked={isChecked} onClick={() => setIschecked(!isChecked)} />;
};

export const Select: Story = () => {
    const [selected, setSelected] = useState<string>('');
    const options: SelectOption[] = [
        { text: 'One', value: '1' },
        { text: 'Two', value: '2' },
        { text: 'Three', value: '3' },
    ];
    return (
        <SelectUi
            name="storybook-select"
            selectedValue={selected}
            onChange={(s: string) => setSelected(s)}
            options={options}
        />
    );
};

export const Input: Story = () => {
    return <InputUi label="test" placeholder="This is an input" />;
};

export default {
    title: 'Core/Form Elements',
} as Meta;
