import { DashboardWidget } from '../dashboard-widget/dashboard-widget';
import { Team } from '../team/team.model';
export class Dashboard{
    id: any;
    title: string;
    description: string;
    dashboardWidgets?: DashboardWidget[];
    team:Team;
}
