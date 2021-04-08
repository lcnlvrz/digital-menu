export enum UserRoles {
    OWNER = 'OWNER',
    CUSTOMER = 'CUSTOMER',
}

export interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
    role: UserRoles[];
}

export interface UserLoading {
    isLoading: boolean;
}

export type UserReducerInterface = UserInterface & UserLoading;

export enum UserActionsTypes {
    SET_USER = 'SET_USER',
    CLEAR_USER = 'CLEAR_USER',
}

export interface AccessToken {
    accessToken: string;
}

export type UserActions =
    | { type: UserActionsTypes.SET_USER; payload: UserInterface }
    | { type: UserActionsTypes.CLEAR_USER };
