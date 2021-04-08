import { AxiosResponse } from 'axios';
import { axiosAPI } from '../axios/axios.instance';

import { LoginInitialValue } from '../initial-values/Login/login.initial-value';
import { RegisterInitialValue } from '../initial-values/Register';
import { RegisterInterface, RegisterOutputDto } from '../interfaces/Register/register.interface';
import { UserInterface } from '../interfaces/User';

export class AuthService {
    async me(token: string): Promise<AxiosResponse<UserInterface>> {
        return await axiosAPI.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async register(input: RegisterInterface): Promise<AxiosResponse<RegisterOutputDto>> {
        return await axiosAPI.post('/auth/register', input);
    }

    async login(input: typeof LoginInitialValue): Promise<AxiosResponse<RegisterOutputDto>> {
        return await axiosAPI.post('/auth/login', input);
    }
}
