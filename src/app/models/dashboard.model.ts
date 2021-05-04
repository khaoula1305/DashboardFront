import { DashboardWidget } from './dashboard-widget';
import { Team } from './team.model';
export class Dashboard{
    id: any;
    title: string;
    description: string;
    dashboardWidgets?: DashboardWidget[];
    team:Team;
}
