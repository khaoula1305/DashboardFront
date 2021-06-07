
export class DataSource{
    id: number;
    title: string;
    type: string;
    description: string;
    path: string;
    associatedQuery?: number; //get the main query id if it's the details query
}
