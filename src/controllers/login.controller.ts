import { message } from 'antd';
import { AxiosError } from 'axios';
import { Dispatch } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginInitialValue } from '../initial-values/Login/login.initial-value';
import { UseLoginInterface } from '../interfaces/Login/login.interface';
import { UserActionsTypes } from '../interfaces/User';
import { AllActions } from '../redux/reducers/root-state.reducer';
import { AuthService } from '../services/auth.service';

export const useLogin = (): UseLoginInterface => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch: Dispatch<AllActions> = useDispatch();

    const authService = new AuthService();

    const login = (input: typeof LoginInitialValue) => {
        setIsLoading(true);
        authService
            .login(input)
            .then((res) => {
                const { accessToken, user } = res.data;
                localStorage.setItem('accessToken', accessToken);
                dispatch({ type: UserActionsTypes.SET_USER, payload: user });
            })
            .catch((err: AxiosError) => {
                setIsLoading(false);
                message.error(err.response?.data?.message);
            });
    };

    return { isLoading, login };
};
