import { message } from 'antd';
import { AxiosError } from 'axios';
import { Dispatch } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RestaurantInitialValue } from '../initial-values/Restaurant/restaurant.initial-value';
import { RestaurantActionsTypes } from '../interfaces/Restaurant/restaurant.interface';
import { AllActions, RootState } from '../redux/reducers/root-state.reducer';
import { RestaurantService } from '../services/restaurant.service';

export const useModalCreateRestaurant = (): {
    isOpen: boolean;
    createRestaurant: (input: typeof RestaurantInitialValue) => void;
    isLoading: boolean;
} => {
    const [isOpen, setIsOpen] = useState(false);

    const restaurant = useSelector((state: RootState) => state.restaurant);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch: Dispatch<AllActions> = useDispatch();

    const restaurantService = new RestaurantService();

    const createRestaurant = (input: typeof RestaurantInitialValue) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        setIsLoading(true);
        restaurantService
            .createRestaurant(input, token)
            .then((res) => {
                const { owner, ...restaurant } = res.data;
                dispatch({ type: RestaurantActionsTypes.SET_RESTAURANT, payload: restaurant });
            })
            .catch((err: AxiosError) => {
                setIsLoading(false);
                message.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        if (!restaurant.id && !restaurant.isLoading) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [restaurant]);

    return { isOpen, createRestaurant, isLoading };
};
