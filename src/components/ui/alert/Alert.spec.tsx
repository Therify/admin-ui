import { render } from '@testing-library/react';
//TODO: Set this up in jest.config.js
import '@testing-library/jest-dom/extend-expect';
import { Alert } from './Alert';
import userEvent from '@testing-library/user-event';

describe('Alert', () => {
    const message = 'This is a test';
    it('should render alert message', () => {
        const { getByText } = render(<Alert message={message} autoHideDurationInMs={null} />);
        expect(getByText(message)).toBeInTheDocument();
    });

    it('should call `onDismiss` when user closes alert', () => {
        const onDismiss = jest.fn();
        const { getByTitle } = render(<Alert message={message} onDismiss={onDismiss} autoHideDurationInMs={null} />);
        const CloseButton = getByTitle('Close');
        userEvent.click(CloseButton);
        expect(onDismiss).toHaveBeenCalledTimes(1);
    });
});
