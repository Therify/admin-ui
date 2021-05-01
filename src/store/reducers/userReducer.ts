import { UserActionType, IUserAction, SetUserPayload } from '../actions';
export type UserStore = {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    token: string;
};
const initialState: UserStore = {
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    token: '',
};

export default function userReducer(state = initialState, action: IUserAction<any>) {
    switch (action.type) {
        case UserActionType.SET_USER:
            const { payload: userDetails } = action as IUserAction<SetUserPayload>;
            return {
                ...state,
                ...userDetails,
            };
        default:
            return state;
    }
}
