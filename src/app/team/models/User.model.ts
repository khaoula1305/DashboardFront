import { Dashboard } from "../../dashboard/models/dashboard.model";
import { Team } from "./team.model";

export class User{
  id:any;
  lastName:string;
  firstName:string;
  teams:Team[];
  dashboards: Dashboard[];
}
