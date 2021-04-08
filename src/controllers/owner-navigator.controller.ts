import { useState } from 'react';
import { OwnerNavigatorPages } from '../interfaces/OwnerNavigator/owner-navigator.interface';

export const useOwnerNavigator = () => {
    const [currentPage, setCurrentPage] = useState<OwnerNavigatorPages[]>([]);
};
