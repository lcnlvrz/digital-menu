import { AxiosError } from 'axios';
import { Dispatch } from 'react';
import { UserActionsTypes } from '../../interfaces/User';
import { AuthService } from '../../services/auth.service';
import { AllActions } from '../reducers/root-state.reducer';

export const authFetch = (dispatch: Dispatch<AllActions>): void => {
    const token = localStorage.getItem('accessToken');
    if (!token) return dispatch({ type: UserActionsTypes.CLEAR_USER });
    const service = new AuthService();
    service
        .me(token)
        .then((res) => {
            const user = res.data;
            dispatch({ type: UserActionsTypes.SET_USER, payload: user });
        })
        .catch((err: AxiosError) => {
            localStorage.removeItem('accessToken');
            throw err;
        });
};
