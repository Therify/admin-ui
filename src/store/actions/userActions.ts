import { User } from '../../models';

export interface IUserAction<PayloadType> {
    type: UserActionType;
    payload: PayloadType;
}

export enum UserActionType {
    SET_USER = 'SET_USER',
}

export type SetUserPayload = User;
export const setUser = (user: User): IUserAction<SetUserPayload> => ({
    type: UserActionType.SET_USER,
    payload: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
        token: user.token,
    },
});
