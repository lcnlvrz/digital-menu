import { message } from 'antd';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { useToken } from '../hooks/useToken';
import { CreateMenu, RestaurantActionsTypes } from '../interfaces/Restaurant/restaurant.interface';
import { AllActions } from '../redux/reducers/root-state.reducer';
import { MenuService } from '../services/menu.service';

export const useCreateMenu = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = () => {
        if (isOpenModal) {
            setIsOpenModal(false);
        } else {
            setIsOpenModal(true);
        }
    };

    const tokenController = useToken();

    const menuService = new MenuService();

    const dispatch: Dispatch<AllActions> = useDispatch();

    const createMenu = (input: CreateMenu) => {
        const token = tokenController.execute();
        if (!token) return;
        setIsLoading(true);
        menuService
            .create(input, token)
            .then((res) => {
                setIsLoading(false);
                dispatch({ type: RestaurantActionsTypes.ADD_NEW_MENU, payload: res.data });
                handleOpen();
                message.success('Menu created successfully!');
            })
            .catch((err: AxiosError) => {
                setIsLoading(false);
                message.error(err.response?.data?.detail || 'Unexpected error!');
            });
    };

    return { isOpenModal, handleOpen, isLoading, createMenu };
};
