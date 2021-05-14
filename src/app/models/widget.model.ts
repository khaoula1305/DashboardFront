import { DataSource } from './data-source.model';
import { MetaDataSource } from './meta-data-source.model';
import { WidgetType } from './widget-type';

export class Widget{
    id: number;
    title: string;
    description: string;
    resizeEnabled: boolean;
    minItemCols: number;
    minItemRows: number;
    defaultItemCols: number;
    defaultItemRows: number;
    dataSource: DataSource;
    dataSourceDetails: DataSource;
    widgetType: WidgetType;
    metaDataSources: MetaDataSource[];
}
