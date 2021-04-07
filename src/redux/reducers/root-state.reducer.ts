import { combineReducers } from 'redux';
import { UserActions } from '../../interfaces/User';
import { userReducer } from './user';

export const RootStateReducer = combineReducers({
    user: userReducer,
});

export type RootState = ReturnType<typeof RootStateReducer>;

export type AllActions = UserActions;
