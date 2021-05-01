import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MatchCounter } from './MatchCounter';
import '@testing-library/jest-dom/extend-expect';

describe('MatchCounter', () => {
    afterEach(cleanup);
    it('renders successfully', () => {
        const { container } = render(<MatchCounter good={0} incompatibilities={0} warnings={0} />);
        expect(container.childElementCount).toBe(1);
    });

    it('should render incompatibilities count', () => {
        const { getByTestId } = render(<MatchCounter good={0} incompatibilities={1} warnings={0} />);
        const incompatibilies = getByTestId('match-counter-incompatibilies');
        expect(incompatibilies).toHaveTextContent('1 incompatibility');
    });

    it('should render good count', () => {
        const { getByTestId } = render(<MatchCounter good={1} incompatibilities={0} warnings={0} />);
        const goodRankings = getByTestId('match-counter-rankings');
        expect(goodRankings).toHaveTextContent('1 ranking');
    });

    it('should render warnings count', () => {
        const { getByTestId } = render(<MatchCounter good={0} incompatibilities={0} warnings={1} />);
        const goodRankings = getByTestId('match-counter-warnings');
        expect(goodRankings).toHaveTextContent('1 warning');
    });

    it('should use singular nouns when one match type found', () => {
        const { getByTestId } = render(<MatchCounter good={1} incompatibilities={1} warnings={1} />);
        const incompatibilies = getByTestId('match-counter-incompatibilies');
        const rankings = getByTestId('match-counter-rankings');
        const warnings = getByTestId('match-counter-warnings');
        expect(rankings).toHaveTextContent('ranking');
        expect(incompatibilies).toHaveTextContent('incompatibility');
        expect(warnings).toHaveTextContent('warning');
    });

    it('should use plural nouns when appropriate', () => {
        const { getByTestId } = render(<MatchCounter good={0} incompatibilities={0} warnings={0} />);
        const incompatibilies = getByTestId('match-counter-incompatibilies');
        const rankings = getByTestId('match-counter-rankings');
        const warnings = getByTestId('match-counter-warnings');
        expect(rankings).toHaveTextContent('rankings');
        expect(incompatibilies).toHaveTextContent('incompatibilities');
        expect(warnings).toHaveTextContent('warnings');
    });
});
