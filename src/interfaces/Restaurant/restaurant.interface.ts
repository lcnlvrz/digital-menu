import { RestaurantInitialValue } from '../../initial-values/Restaurant/restaurant.initial-value';
import { CreatePlateResponse, PlateExtended } from '../../services/menu.service';
import { UserInterface, UserLoading } from '../User';

export interface CreateMenu {
    name: string;
    description: string;
}

export interface MenuExtended {
    id: number;
    plates?: PlateInterface[];
}

export type MenuInterface = CreateMenu & MenuExtended;

export interface PlateInterface {
    title: string;
    description: string;
    image: string;
    price: number;
    preparationTime: string[];
    ingredients: string[];
}

export interface RestaurantInterface {
    id: number;
    name: string;
    description: string;
    location: string;
    scheduleDays: string[];
    scheduleHour: string[];
    menus: MenuInterface[];
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
    menus: [],
    isDelivery: undefined,
    id: undefined,
    isLoading: true,
};

export enum RestaurantActionsTypes {
    SET_RESTAURANT = 'SET_RESTAURANT',
    CLEAR_RESTAURANT = 'CLEAR_RESTAURANT',
    UPDATE_RESTAURANT = 'UPDATE_RESTAURANT',
    ADD_NEW_MENU = 'ADD_NEW_MENU',
    ADD_NEW_PLATE = 'ADD_NEW_PLATE',
}

export interface PlateWithMenuId {
    menuId: number;
    image: string;
}

export type AddNewPlate = CreatePlateResponse & PlateWithMenuId;

export type RestaurantActions =
    | { type: RestaurantActionsTypes.SET_RESTAURANT; payload: Partial<RestaurantInterface> }
    | { type: RestaurantActionsTypes.CLEAR_RESTAURANT }
    | { type: RestaurantActionsTypes.UPDATE_RESTAURANT; payload: Partial<RestaurantInterface> }
    | { type: RestaurantActionsTypes.ADD_NEW_MENU; payload: MenuInterface }
    | { type: RestaurantActionsTypes.ADD_NEW_PLATE; payload: AddNewPlate };

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
