import { cleanup } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithStore } from '../../utils/testUtils';
import { Navigation } from './Navigation';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: 'localhost:3000/matches',
    }),
}));
describe('Navigation', () => {
    afterEach(cleanup);
    it('should show link display text when expanded', () => {
        const { getByText } = renderWithStore(
            <BrowserRouter>
                <Navigation isExpanded />
            </BrowserRouter>,
        );
        expect(getByText('Matches')).toBeInTheDocument();
        expect(getByText('Providers')).toBeInTheDocument();
    });

    it('should hide link display text when collapsed', () => {
        const { queryByText } = renderWithStore(
            <BrowserRouter>
                <Navigation isExpanded={false} />
            </BrowserRouter>,
        );
        expect(queryByText('Matches')).toBeNull();
        expect(queryByText('Providers')).toBeNull();
    });

    it('should render user’s first name in greeting', () => {
        const { getByText } = renderWithStore(
            <BrowserRouter>
                <Navigation isExpanded />
            </BrowserRouter>,
            { initialState: { user: { firstName: 'Testo' } } },
        );
        expect(getByText('Hello, Testo')).toBeInTheDocument();
    });
});
