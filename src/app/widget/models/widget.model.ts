import { DataSource } from '../../data-source/models/data-source.model';
import { WidgetType } from './widget-type';
import { MetaDataSource } from './meta-data-source.model';

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
