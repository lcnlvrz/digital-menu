import { Input, message } from 'antd';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import { AxiosError } from 'axios';
import React, { LegacyRef, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { CreatePlate } from '../components/AddPlate/AddPlate';
import { useToken } from '../hooks/useToken';
import { RestaurantActionsTypes } from '../interfaces/Restaurant/restaurant.interface';
import { AllActions } from '../redux/reducers/root-state.reducer';
import { ImageService } from '../services/image.service';
import { MenuService } from '../services/menu.service';

export const useAddPlate = () => {
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState({
        tags: ['Meat'],
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
    });
    const [fileList, setFileList] = useState<RcFile>();
    const [previewImage, setPreviewImage] = useState<string>('');

    const inputRef: LegacyRef<Input> = useRef(null);
    const tokenController = useToken();
    const dispatch: Dispatch<AllActions> = useDispatch();

    const menuService = new MenuService();
    const imageService = new ImageService();

    const handleOpen = () => {
        if (visible) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    };

    const handleClose = (
        removedTag: any,
        setValues: (values: React.SetStateAction<CreatePlate>, shouldValidate?: boolean | undefined) => void,
    ) => {
        const tagsFiltered = tags.tags.filter((tag) => tag !== removedTag);
        setTags({ ...tags, tags: tagsFiltered });
        setValues((prevState) => ({ ...prevState, ingredients: tagsFiltered }));
    };

    const showInput = () => {
        setTags({ ...tags, inputVisible: true });
        inputRef.current?.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTags({ ...tags, inputValue: e.target.value });
    };

    const handleInputConfirm = (
        setValues: (values: React.SetStateAction<CreatePlate>, shouldValidate?: boolean | undefined) => void,
    ) => {
        const { inputValue } = tags;
        let { tags: tagsArray } = tags;
        if (inputValue && tagsArray.indexOf(inputValue) === -1) {
            tagsArray = [...tagsArray, inputValue];
        }
        setTags({
            ...tags,
            tags: tagsArray,
            inputVisible: false,
            inputValue: '',
        });
        setValues((prevState) => ({ ...prevState, ingredients: tagsArray }));
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTags({ ...tags, editInputValue: e.target.value });
    };

    const handleEditInputConfirm = (
        setValues: (values: React.SetStateAction<CreatePlate>, shouldValidate?: boolean | undefined) => void,
    ) => {
        const newTags = [...tags.tags];
        newTags[tags.editInputIndex] = tags.editInputValue;
        setTags({ ...tags, tags: newTags, editInputIndex: -1, editInputValue: '' });
        setValues((prevState) => ({ ...prevState, ingredients: newTags }));
    };

    const handleDoubleClick = (index: number, tag: string, e: React.MouseEvent) => {
        if (index !== 0) {
            setTags({ ...tags, editInputIndex: index, editInputValue: tag });
            inputRef.current?.focus();
            e.preventDefault();
        }
    };

    const beforeUpload = (
        file: RcFile,
        setValues: (values: React.SetStateAction<CreatePlate>, shouldValidate?: boolean | undefined) => void,
    ): boolean => {
        const isSmallerThan2MB = file.size / 1024 / 1024 < 2;
        if (!isSmallerThan2MB) {
            message.error('Image too heavy!');
            return false;
        } else {
            setFileList(file);
            const bobURL = URL.createObjectURL(file);
            setPreviewImage(bobURL);
            setValues((prevState) => ({ ...prevState, image: 'setted' }));
            return false;
        }
    };

    const handleRemovePhoto = (
        setValues: (values: React.SetStateAction<CreatePlate>, shouldValidate?: boolean | undefined) => void,
    ) => {
        setFileList(undefined);
        setPreviewImage('');
        setValues((prevState) => ({ ...prevState, image: '' }));
    };

    const createPlate = (input: CreatePlate, menuId: number, children: any) => {
        const token = tokenController.execute();
        if (!token || !fileList) return;
        setIsLoading(true);
        imageService
            .execute(fileList)
            .then((res) => {
                menuService
                    .createPlate({ ...input, price: Number(input.price), image: res.data.secure_url, menuId }, token)
                    .then((res) => {
                        setIsLoading(false);
                        dispatch({ type: RestaurantActionsTypes.ADD_NEW_PLATE, payload: { ...res.data, menuId } });
                        handleOpen();
                        message.success('Plate created successfully!');
                        setFileList(undefined);
                        setPreviewImage('');
                        children.resetForm({});
                    })
                    .catch((err: AxiosError) => {
                        setIsLoading(false);
                        message.error(err.response?.data?.detail || 'Unexpected error!');
                    });
            })
            .catch((err: AxiosError) => {
                setIsLoading(false);
                message.error(err.response?.data?.detail || 'Unexpected error!');
            });
    };

    return {
        tags,
        visible,
        isLoading,
        handleOpen,
        handleClose,
        showInput,
        previewImage,
        handleRemovePhoto,
        createPlate,
        fileList,
        handleInputChange,
        beforeUpload,
        handleInputConfirm,
        handleDoubleClick,
        handleEditInputChange,
        handleEditInputConfirm,
        inputRef,
    };
};
