import { Query } from './query.model';
import { WidgetType } from './widget-type';

export class Widget{
    id: number;
    title: string;
    description: string;
    type: WidgetType;
    resizeEnabled: boolean ;
    minItemCols: number;
    minItemRows: number;
    query: Query;
}
