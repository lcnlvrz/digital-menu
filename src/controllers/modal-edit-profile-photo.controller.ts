import { message } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RestaurantInitialValue } from '../initial-values/Restaurant/restaurant.initial-value';
import { RestaurantActionsTypes, RestaurantInterface } from '../interfaces/Restaurant/restaurant.interface';
import { AllActions } from '../redux/reducers/root-state.reducer';
import { RestaurantService } from '../services/restaurant.service';

export const useModalEditProfilePhoto = () => {
    const [isUpdatingProfilePhoto, setIsUpdatingProfilePhoto] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateProfilePhoto = () => {
        if (isUpdatingProfilePhoto) {
            setIsUpdatingProfilePhoto(false);
        } else {
            setIsUpdatingProfilePhoto(true);
        }
    };

    const restaurantService = new RestaurantService();

    const dispatch: Dispatch<AllActions> = useDispatch();

    const deletePhoto = (input: Partial<RestaurantInterface>) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        setIsLoading(true);
        restaurantService
            .updateRestaurant(input, token)
            .then((res) => {
                dispatch({ type: RestaurantActionsTypes.SET_RESTAURANT, payload: res.data });
                setIsLoading(false);
            })
            .catch((err: AxiosError) => {
                setIsLoading(false);
                message.error(err.response?.data?.detail);
            });
    };

    return { handleUpdateProfilePhoto, isUpdatingProfilePhoto, deletePhoto, isLoading };
};
