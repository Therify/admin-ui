import { setUser, UserActionType } from '../actions';
import userReducer, { UserStore } from './userReducer';
const mockState: UserStore = {
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    token: '',
};
const mockUser = {
    firstName: 'Test',
    lastName: 'Jackson',
    email: 'test@j.com',
    id: 'test1234',
    token: 'xxxxxxxxxxxx',
};

describe('user reducer', () => {
    it('should return default state', () => {
        const type = '' as UserActionType;
        expect(userReducer(mockState, { type, payload: undefined })).toStrictEqual(mockState);
    });

    it('should set a user to state', () => {
        const action = setUser(mockUser);
        expect(userReducer(mockState, action)).toStrictEqual({ ...mockState, ...mockUser });
    });
});
