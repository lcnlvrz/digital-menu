import { Reducer } from 'redux';
import {
    MenuInterface,
    RestaurantActions,
    RestaurantActionsTypes,
    RestaurantInitialState,
    RestaurantReducerInterface,
} from '../../../interfaces/Restaurant/restaurant.interface';
import { MenuService } from '../../../services/menu.service';

export const restaurantReducer: Reducer<RestaurantReducerInterface, RestaurantActions> = (
    state = RestaurantInitialState,
    action,
): RestaurantReducerInterface => {
    let menusCopy: MenuInterface[] = [];
    if (state.menus) {
        menusCopy = [...state.menus];
    }

    switch (action.type) {
        case RestaurantActionsTypes.SET_RESTAURANT:
            return { ...action.payload, isLoading: false };

        case RestaurantActionsTypes.CLEAR_RESTAURANT:
            return { ...state, isLoading: false };

        case RestaurantActionsTypes.UPDATE_RESTAURANT:
            return { ...state, ...action.payload };

        case RestaurantActionsTypes.ADD_NEW_MENU:
            menusCopy.push(action.payload);
            return { ...state, menus: menusCopy };

        case RestaurantActionsTypes.ADD_NEW_PLATE:
            const { menuId, ...rest } = action.payload;
            const index = menusCopy.findIndex((value) => value.id === menuId);
            menusCopy[index].plates?.push(rest);
            return { ...state, menus: menusCopy };

        default:
            return state;
    }
};
