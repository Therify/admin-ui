import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mocks } from '../../types';
import { CreateMatchModal } from './CreateMatchModal';

describe('CreateMatchModal', () => {
    afterEach(cleanup);
    it('should render user data', () => {
        const { getByText } = render(
            <CreateMatchModal
                selectedUser={Mocks.mockUser}
                isOpen={true}
                isLoading={false}
                providers={[]}
                handleCreate={() => null}
                handleClose={() => null}
            />,
        );
        const userDetails = [
            Mocks.mockUser.emailAddress,
            Mocks.mockUser.stateOfResidence,
            Mocks.mockUser.genderPreference,
            Mocks.mockUser.racePreference,
            Mocks.mockUser.issues[0],
            Mocks.mockUser.insuranceProvider,
        ];
        userDetails.forEach((detail) => expect(getByText(detail)).toBeInTheDocument());
    });
    // TODO: FIX THESE TESTS
    // it('should call handleCreate', () => {
    //     const handleCreate = jest.fn();
    //     const { getByTestId } = render(
    //         <CreateMatchModal
    //             selectedUser={mockUser}
    //             isOpen={true}
    //             isLoading={false}
    //             providers={[]}
    //             handleCreate={handleCreate}
    //             handleClose={() => null}
    //         />,
    //     );
    //     const btn = getByTestId('create-btn');
    //     userEvent.click(btn);
    //     expect(btn).toBeInTheDocument();
    // });

    // it('should call handleClose', () => {
    //     const handleClose = jest.fn();
    //     const { getByTestId } = render(
    //         <CreateMatchModal
    //             selectedUser={mockUser}
    //             isOpen={true}
    //             isLoading={false}
    //             providers={[]}
    //             handleCreate={handleClose}
    //             handleClose={() => null}
    //         />,
    //     );
    //     const btn = getByTestId('cancel-btn');
    //     userEvent.click(btn);
    //     expect(handleClose).toHaveBeenCalled();
    // });

    // it('should render a ranking status when a provider selected', () => {
    //     const { getByTestId } = render(
    //         <CreateMatchModal
    //             selectedUser={mockUser}
    //             isOpen={true}
    //             isLoading={false}
    //             providers={[]}
    //             handleCreate={() => null}
    //             handleClose={() => null}
    //         />,
    //     );
    //     const autoSelect = getByTestId('provider-select');
    //     fireEvent.change(autoSelect);
    //     expect(getByTestId('provider-ranking')).toBeInTheDocument();
    // });
});
