import { Dashboard } from "./dashboard.model";
import { DataSource } from "./data-source.model";
import { Widget } from "./widget.model";
export class  DashboardWidget{
   id: number;
   title: string;
   description: string;
   cols:number ;
   rows: number;
   y:number;
   x: number;
   dashboard: Dashboard;
    widget: Widget;
    dataSource: DataSource;
}
