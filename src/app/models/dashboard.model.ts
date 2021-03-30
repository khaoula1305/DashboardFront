import { DashboardWidget } from './dashboard-widget';
export interface Dashboard{
    id: number;
    title: string;
    description: string;
    dashbaordWidgets: DashboardWidget[];
}
