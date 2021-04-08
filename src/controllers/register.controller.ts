import { message } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RegisterInitialValue } from '../initial-values/Register';
import { RegisterInterface, UseRegisterInterface } from '../interfaces/Register/register.interface';
import { UserActionsTypes } from '../interfaces/User';
import { AllActions } from '../redux/reducers/root-state.reducer';
import { AuthService } from '../services/auth.service';

export const useRegister = (): UseRegisterInterface => {
    const [isLoading, setIsLoading] = useState(false);

    const authService = new AuthService();

    const dispatch: Dispatch<AllActions> = useDispatch();

    const register = (input: RegisterInterface) => {
        console.log(input);
        setIsLoading(true);
        authService
            .register(input)
            .then((res) => {
                setIsLoading(false);
                const { accessToken, user } = res.data;
                localStorage.setItem('accessToken', accessToken);
                dispatch({ type: UserActionsTypes.SET_USER, payload: user });
            })
            .catch((err: AxiosError) => {
                setIsLoading(false);
                message.error(err.response?.data?.message);
            });
    };

    return { register, isLoading };
};
