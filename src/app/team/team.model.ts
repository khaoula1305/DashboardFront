import { Dashboard } from "../dashboard/dashboard.model";
import { User } from "./User.model";

export class Team{
    id?: any;
    title: string;
    dashboards?: Dashboard[];
    admin?: User;
    members: User[];
}
