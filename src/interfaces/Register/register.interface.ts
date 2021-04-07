import { RegisterInitialValue } from '../../initial-values/Register';
import { UserInterface } from '../User';

export interface UseRegisterInterface {
    register: (input: typeof RegisterInitialValue) => void;
    isLoading: boolean;
}

export interface RegisterOutputDto {
    accessToken: string;
    user: UserInterface;
}
