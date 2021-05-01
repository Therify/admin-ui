import React from 'react';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SplitButton, SplitButtonOption } from './SplitButton';
export const mockOptions: SplitButtonOption[] = [
    { value: 'MERGE_COMMIT', text: 'Create a merge commit' },
    { value: 'SQUASH_AND_MERGE', text: 'Squash and merge' },
    { value: 'REBASE_AND_MERGE', text: 'Rebase and merge' },
];
describe('SplitButton', () => {
    afterEach(() => cleanup());
    it('renders successfully', () => {
        const { getByTestId } = render(<SplitButton options={mockOptions} onClick={() => {}} />);
        expect(getByTestId('splitbutton')).toBeDefined();
    });

    it('shows options when clicked', () => {
        const { getByTestId } = render(<SplitButton options={mockOptions} onClick={() => {}} />);
        const optionsBtn = getByTestId('splitbutton-options-btn');
        userEvent.click(optionsBtn);
        const list = getByTestId('splitbutton-options');
        const items = list.querySelectorAll('li');
        items.forEach((item, i) => {
            expect(item.innerHTML).toContain(mockOptions[i].text);
        });
    });

    it('calls `onClick` when main button is clicked', () => {
        const onClick = jest.fn();
        const { getByTestId } = render(<SplitButton options={mockOptions} onClick={onClick} />);
        const mainBtn = getByTestId('splitbutton-btn');
        userEvent.click(mainBtn);
        expect(onClick).toBeCalled();
    });

    it('should change options when list item selected', () => {
        const { getByTestId } = render(<SplitButton options={mockOptions} onClick={() => {}} />);
        const mainBtn = getByTestId('splitbutton-btn');
        const optionsBtn = getByTestId('splitbutton-options-btn');
        userEvent.click(optionsBtn);
        const list = getByTestId('splitbutton-options');
        const items = list.querySelectorAll('li');
        userEvent.click(items[items.length - 1]);
        expect(mainBtn.innerHTML).toContain(mockOptions[mockOptions.length - 1].text);
    });
});
