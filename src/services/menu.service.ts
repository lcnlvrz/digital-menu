import { AxiosResponse } from 'axios';
import { axiosAPI } from '../axios/axios.instance';
import { CreatePlate } from '../components/AddPlate/AddPlate';
import { CreateMenu, MenuInterface, PlateInterface } from '../interfaces/Restaurant/restaurant.interface';

export type CreatePlateWithoutPrice = Omit<CreatePlate, 'price'>;

export interface CreatePlateExtendedForAPi {
    price: number;
    image: string;
    menuId: number;
}

export type CreatePlateInput = CreatePlateWithoutPrice & CreatePlateExtendedForAPi;

export interface PlateExtended {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    menuId: number;
    price: number;
}

export type CreatePlateResponse = CreatePlateWithoutPrice & PlateExtended;

export class MenuService {
    async create(input: CreateMenu, token: string): Promise<AxiosResponse<MenuInterface>> {
        return axiosAPI.post('/menu', input, { headers: { Authorization: 'Bearer ' + token } });
    }

    async createPlate(input: CreatePlateInput, token: string): Promise<AxiosResponse<CreatePlateResponse>> {
        return await axiosAPI.post('/menu/plate', input, { headers: { Authorization: 'Bearer ' + token } });
    }
}
