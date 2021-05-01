import React from 'react';
import { render } from '@testing-library/react';
import { SelectGroup, SelectConfig } from './SelectGroup';

const config: SelectConfig = {
    options: [
        { value: 'one', text: 'One' },
        { value: 'two', text: 'Two' },
    ],
    id: 'test',
    name: 'Test Select',
    selectedValue: 'one',
    label: 'Test',
    onChange: () => {},
};

describe('SelectGroup', () => {
    it('renders successfully', () => {
        const { container } = render(<SelectGroup configs={[config]} />);
        expect(container.childElementCount).toBe(1);
    });

    it('should render a select for each config', () => {
        const { container } = render(
            <SelectGroup
                configs={[
                    { ...config, id: 'one' },
                    { ...config, id: 'two' },
                ]}
            />,
        );
        const selectOne = container.querySelector('#one');
        const selectTwo = container.querySelector('#two');
        expect(selectOne).not.toBeNull();
        expect(selectTwo).not.toBeNull();
    });
});
