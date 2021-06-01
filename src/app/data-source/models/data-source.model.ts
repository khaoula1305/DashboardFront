
export class DataSource{
    id: number;
    title: string;
    type: string;
    description: string;
    associatedQuery?: number; //get the main query id if it's the details query
}
