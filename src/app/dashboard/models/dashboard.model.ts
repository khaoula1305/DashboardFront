import { DashboardWidget } from '../../dashboard-widget/models/dashboard-widget';
import { Team } from '../../team/models/team.model';
export class Dashboard{
    id: any;
    title: string;
    description: string;
    dashboardWidgets?: DashboardWidget[];
    team: Team;
}
