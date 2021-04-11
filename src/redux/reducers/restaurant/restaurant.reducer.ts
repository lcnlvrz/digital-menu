import { Reducer } from 'redux';
import {
    RestaurantActions,
    RestaurantActionsTypes,
    RestaurantInitialState,
    RestaurantReducerInterface,
} from '../../../interfaces/Restaurant/restaurant.interface';

export const restaurantReducer: Reducer<RestaurantReducerInterface, RestaurantActions> = (
    state = RestaurantInitialState,
    action,
): RestaurantReducerInterface => {
    switch (action.type) {
        case RestaurantActionsTypes.SET_RESTAURANT:
            return { ...action.payload, isLoading: false };

        case RestaurantActionsTypes.CLEAR_RESTAURANT:
            return { ...state, isLoading: false };

        case RestaurantActionsTypes.UPDATE_RESTAURANT:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};
