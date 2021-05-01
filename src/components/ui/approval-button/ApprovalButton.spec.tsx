import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApprovalButton } from './ApprovalButton';

// TODO: Write more tests
describe('ApprovalButton', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });
    it('calls onApprove when countdown successful', async () => {
        const onApprove = jest.fn();
        const { getByTestId } = render(<ApprovalButton timeoutInMs={10} onApprove={async () => onApprove()} />);
        userEvent.click(getByTestId('approve-button'));
        expect(setInterval).toHaveBeenCalledTimes(1);
    });
});
