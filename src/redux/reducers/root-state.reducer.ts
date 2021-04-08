import { combineReducers } from 'redux';
import { RestaurantActions } from '../../interfaces/Restaurant/restaurant.interface';
import { UserActions } from '../../interfaces/User';
import { restaurantReducer } from './restaurant';
import { userReducer } from './user';

export const RootStateReducer = combineReducers({
    user: userReducer,
    restaurant: restaurantReducer,
});

export type RootState = ReturnType<typeof RootStateReducer>;

export type AllActions = UserActions | RestaurantActions;
