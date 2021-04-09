import { AxiosResponse } from 'axios';
import { axiosAPI } from '../axios/axios.instance';
import { RestaurantInitialValue } from '../initial-values/Restaurant/restaurant.initial-value';
import { CreateRestaurantResponse, RestaurantInterface } from '../interfaces/Restaurant/restaurant.interface';

export class RestaurantService {
    async getRestaurant(token: string): Promise<AxiosResponse<RestaurantInterface>> {
        return await axiosAPI.get('/restaurant', { headers: { Authorization: 'Bearer' + ' ' + token } });
    }

    async createRestaurant(
        input: typeof RestaurantInitialValue,
        token: string,
    ): Promise<AxiosResponse<CreateRestaurantResponse>> {
        return await axiosAPI.post('/restaurant', input, { headers: { Authorization: 'Bearer' + ' ' + token } });
    }

    async updateRestaurant(
        input: Partial<RestaurantInterface>,
        token: string,
    ): Promise<AxiosResponse<CreateRestaurantResponse>> {
        return await axiosAPI.put('/restaurant', input, { headers: { Authorization: 'Bearer' + ' ' + token } });
    }
}
