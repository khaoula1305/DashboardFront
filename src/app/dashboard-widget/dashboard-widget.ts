import { Dashboard } from '../dashboard/dashboard.model';
import { Widget } from '../widget/widget.model';
export class DashboardWidget{
   id: number;
   title: string;
   description: string;
   xAxisValue: number ;
   yAxisValue: number;
   columnValue: number;
   rowValue: number;
   maxItemCols:number;
   maxItemRows:number;
   dashboard: Dashboard;
   widget: Widget;
}
