import React from 'react';
import { render } from '@testing-library/react';
import { DateChip } from './DateChip';
import { format, addBusinessDays, subBusinessDays } from 'date-fns';
import '@testing-library/jest-dom/extend-expect';

describe('MatchCounter', () => {
    const date = new Date().getTime();

    it('displays date when type is `received`', () => {
        const { getByText } = render(<DateChip type="received" date={date} />);
        const chipDate = getByText(format(date, 'MM/dd'));
        expect(chipDate).toBeInTheDocument();
    });

    it('adds 2 business days to date when type is `due`', () => {
        const { getByText } = render(<DateChip type="due" date={date} />);
        const chipDate = getByText(format(addBusinessDays(date, 2), 'MM/dd'));
        expect(chipDate).toBeInTheDocument();
    });

    it('shows alert icon when due date is today', () => {
        const { getByTestId } = render(<DateChip type="due" date={subBusinessDays(date, 2)} />);
        const alertIcon = getByTestId('priority-high-icon');
        expect(alertIcon).toBeInTheDocument();
    });
});
