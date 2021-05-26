import { Dashboard } from '../../dashboard/models/dashboard.model';
import { User } from './User.model';

export class Team{
    id?: any;
    title: string;
    dashboards?: Dashboard[];
    admin?: User;
    members: User[];
}
