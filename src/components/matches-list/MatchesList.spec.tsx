import React from 'react';
import { MatchesList } from './MatchesList';
import { renderWithStore } from '../../utils/testUtils';
import { Mocks } from '../../types';

describe('MatchesList', () => {
    const mockHandleApprove = jest.fn();
    const mockHandleDeleteMatch = jest.fn();
    const mockHandleCreateMatch = jest.fn();
    const mockOnCheck = jest.fn();

    it('should render message when no matches provided', () => {
        const { getByText } = renderWithStore(
            <MatchesList
                selectedItemsIds={[]}
                matches={[]}
                isLoading={false}
                onCheck={mockOnCheck}
                handleApprove={mockHandleApprove}
                handleDeleteMatch={mockHandleDeleteMatch}
                handleCreateMatch={mockHandleCreateMatch}
            />,
        );
        expect(getByText('All caught up. No matches to show!')).toBeInTheDocument();
    });

    it('should render matches provided', () => {
        const { getByText } = renderWithStore(
            <MatchesList
                selectedItemsIds={[]}
                matches={[Mocks.mockModelResult]}
                isLoading={false}
                onCheck={mockOnCheck}
                handleApprove={mockHandleApprove}
                handleDeleteMatch={mockHandleDeleteMatch}
                handleCreateMatch={mockHandleCreateMatch}
            />,
        );
        expect(getByText(Mocks.mockModelResult.user.emailAddress)).toBeInTheDocument();
    });

    it('should render error state when getMatchError', () => {
        const mockGetMatchesError = 'This is a test';
        const { getByText } = renderWithStore(
            <MatchesList
                selectedItemsIds={[]}
                matches={[]}
                isLoading={false}
                onCheck={mockOnCheck}
                handleApprove={mockHandleApprove}
                handleDeleteMatch={mockHandleDeleteMatch}
                handleCreateMatch={mockHandleCreateMatch}
                errorMessage={mockGetMatchesError}
            />,
        );
        expect(getByText(`Something went wrong: ${mockGetMatchesError}`)).toBeInTheDocument();
    });
});
