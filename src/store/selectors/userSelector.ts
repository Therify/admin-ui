import { UserStore } from '../reducers/userReducer';

type Store = { user: UserStore };
export const getUserState = ({ user }: Store) => user;

export const getUserToken = ({ user }: Store) => user.token;

export const getUserFirstName = ({ user }: Store) => user.firstName;

export const getUserLastName = ({ user }: Store) => user.lastName;

export const getUserName = ({ user: { firstName, lastName } }: Store) => `${firstName} ${lastName}`;
