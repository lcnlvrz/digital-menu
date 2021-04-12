import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { UserActionsTypes } from '../interfaces/User';
import { AllActions } from '../redux/reducers/root-state.reducer';
import { TokenService } from '../services/token.service';

export const useToken = () => {
    const dispatch: Dispatch<AllActions> = useDispatch();

    const tokenService = new TokenService();

    const execute = (): string | undefined => {
        const token = tokenService.get();
        if (!token) {
            dispatch({ type: UserActionsTypes.CLEAR_USER });
            return;
        }
        return token;
    };

    return { execute, tokenService };
};
