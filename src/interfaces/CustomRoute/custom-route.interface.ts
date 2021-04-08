import { UserRoles } from '../User';

export interface CustomRouteInterface {
    role: UserRoles[];
    path: string;
    exact: boolean;
    component: React.FC;
}
