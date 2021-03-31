import { Dashboard } from './dashboard.model';
import { DataSource } from './data-source.model';
import { Widget } from './widget.model';
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
   //dataSource: DataSource;
}
