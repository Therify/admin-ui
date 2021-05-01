import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
    it('renders successfully', () => {
        const { queryByTestId } = render(<SearchBar label="test" onChange={() => {}} value="" />);
        expect(queryByTestId('searchbar')).toBeDefined();
    });

    it('contains the passed in value', () => {
        const text = 'Hello world!';
        const placeholder = 'test';
        const { getByPlaceholderText } = render(
            <SearchBar placeholder={placeholder} label="test" onChange={() => {}} value={text} />,
        );
        const input = getByPlaceholderText(placeholder);
        expect(input.getAttribute('value')).toBe(text);
    });

    it('calls `onChange` when value changes', () => {
        const handleChange = jest.fn();
        const placeholder = 'Hello world!';
        const { getByPlaceholderText } = render(
            <SearchBar placeholder={placeholder} label="test" onChange={handleChange} value="" />,
        );
        const input = getByPlaceholderText(placeholder);
        userEvent.type(input, 'test');
        expect(handleChange).toHaveBeenCalled();
    });

    it('calls `onClear` when icon clicked', () => {
        const handleClear = jest.fn();
        const { getByTestId } = render(<SearchBar label="test" onChange={() => {}} onClear={handleClear} value="" />);
        const clear = getByTestId('searchbar-clear');
        userEvent.click(clear);
        expect(handleClear).toHaveBeenCalled();
    });
});
