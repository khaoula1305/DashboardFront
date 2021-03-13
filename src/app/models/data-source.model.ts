import { Query } from "./query.model";

export interface DataSource{
    id: number;
    title: string;
    url: string;
    //authentication
    //query: Query[];
}