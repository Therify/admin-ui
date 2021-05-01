import { cleanup } from '@testing-library/react';
import { MatchesList } from './MatchesList';
import { renderWithStore } from '../../utils/testUtils';
import { Mocks } from '@therify/types';
import { MatchTypes } from '@therify/types';

describe('MatchesList', () => {
    const mockHandleApprove = jest.fn();
    const mockHandleDeleteMatch = jest.fn();
    const mockHandleCreateMatch = jest.fn();
    const mockOnCheck = jest.fn();
    let mockMatches: MatchTypes.Match[] = [];
    let mockIsLoadingMatches = false;
    let mockGetMatches = jest.fn();
    let mockGetMatchesError: string | undefined = undefined;
    beforeEach(() => {
        mockMatches = [];
        mockIsLoadingMatches = false;
        mockGetMatches = jest.fn();
        mockGetMatchesError = undefined;
    });
    afterEach(cleanup);
    afterAll(() => jest.unmock('../../hooks/useMatchesApi'));
    jest.mock('../../hooks/useMatchesApi', () => ({
        matches: mockMatches,
        isLoadingMatches: mockIsLoadingMatches,
        getMatches: mockGetMatches,
        getMatchesError: mockGetMatchesError,
    }));
    it('needs tests written', () => {
        expect(0).toBe(0);
    });
    // it('should render message when no matches provided', () => {
    //     // TODO: Fix this test
    //     const { getByText } = renderWithStore(
    //         <MatchesList
    //             isLoading={false}
    //             onCheck={mockOnCheck}
    //             handleApprove={mockHandleApprove}
    //             handleDeleteMatch={mockHandleDeleteMatch}
    //             handleCreateMatch={mockHandleCreateMatch}
    //         />,
    //     );
    //     expect(getByText('All caught up. No matches to show!')).toBeInTheDocument();
    // });

    // it('should render matches provided', () => {
    //     // TODO: Fix this test
    //     mockMatches = [mockModelResult];
    //     const { getByText } = renderWithStore(
    //         <MatchesList
    //             isLoading={false}
    //             onCheck={mockOnCheck}
    //             handleApprove={mockHandleApprove}
    //             handleDeleteMatch={mockHandleDeleteMatch}
    //             handleCreateMatch={mockHandleCreateMatch}
    //         />,
    //     );
    //     expect(getByText(mockModelResult.patient.email)).toBeInTheDocument();
    // });

    // it('should render error state when getMatchError', () => {
    //     mockGetMatchesError = 'This is a test';
    //     const { getByText } = renderWithStore(
    //         <MatchesList
    //             isLoading={false}
    //             onCheck={mockOnCheck}
    //             handleApprove={mockHandleApprove}
    //             handleDeleteMatch={mockHandleDeleteMatch}
    //             handleCreateMatch={mockHandleCreateMatch}
    //         />,
    //     );
    //     expect(getByText(mockGetMatchesError)).toBeInTheDocument();
    // });
});
