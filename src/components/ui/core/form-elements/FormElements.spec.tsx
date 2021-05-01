import React from 'react';
import { render } from '@testing-library/react';
import { Select, SelectOption } from './FormElements';

const mockOptions: SelectOption[] = [
    { text: 'One', value: '1' },
    { text: 'Two', value: '2' },
    { text: 'Three', value: '3' },
];
describe('Select', () => {
    it('renders successfully', () => {
        const { container } = render(<Select onChange={jest.fn()} selectedValue="" options={mockOptions} />);
        expect(container.childElementCount).toBe(1);
    });

    it('renders all provided options', () => {
        const { getByText } = render(
            <Select onChange={jest.fn()} selectedValue={mockOptions[0].value} options={mockOptions} />,
        );
        const options = mockOptions.map((opt) => getByText(opt.text));
        expect(options.length).toBe(mockOptions.length);
        options.forEach((opt) => expect(opt).toBeDefined());
    });
});
