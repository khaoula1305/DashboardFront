import { Dashboard } from '../../dashboard/models/dashboard.model';
import { Widget } from '../../widget/models/widget.model';
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
