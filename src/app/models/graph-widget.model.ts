import { WidgetType } from "./widget-type";

export interface GraphWidget extends WidgetType{
    id: number;
    type: string; //line, bar, pie ...
    img: string; 
} 