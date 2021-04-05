import { MetaDataSource } from "./meta-data-source.model";

export class DataSource{
    id: number;
    title: string;
    url: string;
    password: string;
    userName: string;
    metaDataSourceList: MetaDataSource[];
}