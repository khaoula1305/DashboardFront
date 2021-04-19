import { DataSource } from "./data-source.model";

export class Rest extends DataSource{
    type:string;
    url: string;
    username: string;
    password: string;
    token: string;
}