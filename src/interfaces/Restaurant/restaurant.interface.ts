import { RestaurantInitialValue } from '../../initial-values/Restaurant/restaurant.initial-value';
import { UserInterface, UserLoading } from '../User';

export interface RestaurantInterface {
    id: number;
    name: string;
    description: string;
    location: string;
    scheduleDays: string[];
    scheduleHour: [string, string];
    cellphone: number;
    profilePhoto: string;
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
    scheduleDays: undefined,
    scheduleHour: undefined,
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

export interface UseCreateRestaurant {
    isOpen: boolean;
    createRestaurant: (input: typeof RestaurantInitialValue) => void;
    isLoading: boolean;
    checkErrorsExtended: (input: typeof RestaurantInitialValue) => boolean;
    errorsExtended: {
        scheduleHour: string;
        scheduleDays: string;
    };
}
