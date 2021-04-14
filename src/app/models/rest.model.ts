import { DataSource } from "./data-source.model";

export class Rest extends DataSource{
    type:string;
    url: string;
    login: string;
    password: string;
    token: string;
}