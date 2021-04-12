import { message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useUpdateRestaurant } from '../hooks/useUpdateRestaurant';
import { ImageService } from '../services/image.service';
import { Photo } from './my-restaurant.controller';

export interface UseModalUpdatePhotoParams {
    bannerOrProfile: Photo;
    handleOpen: () => void;
}

export interface PreviewImageState {
    file?: RcFile;
    bobURL?: string;
}

export const useModalUpdatePhoto = (params: UseModalUpdatePhotoParams) => {
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<PreviewImageState>({ bobURL: undefined, file: undefined });

    const imageService = new ImageService();
    const updateRestaurant = useUpdateRestaurant({ setIsLoading });

    const handleLoading = () => {
        if (isLoading) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    };

    const updatePhoto = () => {
        if (!previewImage.file) return;
        handleLoading();
        imageService
            .execute(previewImage.file)
            .then((res) => {
                switch (params.bannerOrProfile) {
                    case Photo.BANNER:
                        updateRestaurant.execute({ bannerPhoto: res.data.secure_url }, onRemove, params.handleOpen);
                        break;
                    default:
                        updateRestaurant.execute({ profilePhoto: res.data.secure_url }, onRemove, params.handleOpen);
                        break;
                }
            })
            .catch((err: AxiosError) => {
                handleLoading();
                message.error(err.response?.data?.message || 'Unexpected error');
            });
    };

    const onRemove = () => {
        setPreviewImage({});
    };

    const beforeUpload = (file: RcFile): boolean => {
        const isLowerThanTwoMB = file.size / 1024 / 1024 < 2;
        if (!isLowerThanTwoMB) {
            message.error('Image must be smaller than 2MB');
        } else {
            const bobURL = URL.createObjectURL(file);
            setPreviewImage({ bobURL, file });
        }
        return false;
    };

    return { updatePhoto, isLoading, onRemove, previewImage, beforeUpload };
};
