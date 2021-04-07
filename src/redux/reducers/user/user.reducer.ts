import { Reducer } from 'redux';
import { UserInitialValue } from '../../../initial-values/User';
import { UserActions, UserActionsTypes, UserReducerInterface } from '../../../interfaces/User';

export const userReducer: Reducer<UserReducerInterface, UserActions> = (
    state = { ...UserInitialValue, isLoading: true },
    action,
): UserReducerInterface => {
    switch (action.type) {
        case UserActionsTypes.SET_USER:
            return { ...action.payload, isLoading: false };

        case UserActionsTypes.CLEAR_USER:
            return { ...state, isLoading: false };

        default:
            return state;
    }
};
