import { UserInterface, UserLoading } from '../User';

export interface RestaurantInterface {
    id: number;
    name: string;
    description: string;
    location: string;
    schedule: [string, string];
    cellphone: number;
    bannerPhoto: string;
    isDelivery: boolean;
}

export interface OwnerRestaurant {
    owner: UserInterface;
}

export type CreateRestaurantResponse = RestaurantInterface & OwnerRestaurant;

export type RestaurantReducerInterface = Partial<RestaurantInterface> & UserLoading;

export const RestaurantInitialState: RestaurantReducerInterface = {
    bannerPhoto: undefined,
    cellphone: undefined,
    description: undefined,
    name: undefined,
    schedule: undefined,
    location: undefined,
    isDelivery: undefined,
    id: undefined,
    isLoading: true,
};

export enum RestaurantActionsTypes {
    SET_RESTAURANT = 'SET_RESTAURANT',
    CLEAR_RESTAURANT = 'CLEAR_RESTAURANT',
}

export type RestaurantActions =
    | { type: RestaurantActionsTypes.SET_RESTAURANT; payload: Partial<RestaurantInterface> }
    | { type: RestaurantActionsTypes.CLEAR_RESTAURANT };
