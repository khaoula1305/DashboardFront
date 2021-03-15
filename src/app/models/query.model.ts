import { DataSource } from './data-source.model';

export interface Query{
    id: number;
    name: string;
    dimension: string;
    mesure1: string;
    mesure2: string;
    mesure3: string;
    dataSource: DataSource;
}
