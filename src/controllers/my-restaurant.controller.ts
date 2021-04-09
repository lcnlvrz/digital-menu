import { useState } from 'react';

export const useMyRestaurant = (): {
    isChangeProfilePhoto: boolean;
    handleProfilePhoto: () => void;
} => {
    const [isChangeProfilePhoto, setIsChangeProfilePhoto] = useState(false);

    const handleProfilePhoto = () => {
        if (isChangeProfilePhoto) {
            setIsChangeProfilePhoto(false);
        } else {
            setIsChangeProfilePhoto(true);
        }
    };

    return { isChangeProfilePhoto, handleProfilePhoto };
};
