import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Widget } from 'src/app/models/widget.model';
import { WidgetsService } from 'src/app/services/widgets.service';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { WidgetTypeEnum } from 'src/app/models/widgetTypeEnum';

@Component({
  selector: 'app-my-widgets',
  templateUrl: './my-widgets.component.html',
  styleUrls: ['./my-widgets.component.scss'],
  providers: [MessageService]
})
export class MyWidgetsComponent implements OnInit {

  myWidgets: Widget[];
  load = false;
  errDeletingMsgs: Message[];
  err = false;
  widget: any;
  searchText:any;
  visibleSidebar;
  selectedWidget:Widget;
  results=[];
  widgetType: string;
  selectedKeys : MetaDataSource[];
  widgetTypeEnum = WidgetTypeEnum;
  result;
  dimensionKey: MetaDataSource;
  datasets: any[] = [];
  basicData: any;


  constructor(private widgetService: WidgetsService,private dataSourceService: DataSourceService, private router: Router, private primengConfig: PrimeNGConfig,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.widgetService.getAllWidgets().subscribe(
      (data) => {
        this.myWidgets = data;
      },
      (error) => {
        console.error();
      },
      () => {
        this.load = true;
      }
    );
  }
  updateWidget(widget: any){
    this.router.navigate(['/upWidget', widget.id]); 
  }
  onDeleteWidget(widget: Widget){
    this.widget=widget;
    this.widgetService.getAllDashboardWidgets(widget.id).subscribe(
      (data) => {
        if(data.length>0){
          this.showConfirm({key: 'a', sticky: true, severity:'warn', summary:'Widget is already used', detail:' This will remove the widget and its associated data and cannot be undone!'});
        } else{
          this.showConfirm({key: 'a',  severity:'custom', summary:'Are you sure you want to remove this widget?', detail:' !'});
        }
      }
    );
  }
  showConfirm(message: any) {
    this.messageService.clear();
    this.messageService.add(message);
}
  onConfirm() {
    this.deleteWidget(this.widget);
    this.messageService.clear('a');
  }
  
  onReject() {
    this.messageService.clear('a');
  }

  deleteWidget(widget: any){
    this.widgetService.deleteWidget(widget.id).subscribe(
      (result)=>{
      this.router.navigateByUrl('/NewDashboard', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/myWidgets']); 
        });
      }
    );
  }

  onShowDetails(id:any){
    this.visibleSidebar = true;
    var myLabels=[];
    var objet: any;
    this.widgetService
    .getAllWidgets()
    .subscribe((data) => {
      this.selectedWidget = data.find((e) => e.id == id);
      this.widgetType = this.selectedWidget.widgetType.type;
      this.selectedKeys= this.selectedWidget.metaDataSources;
      console.log('selected widget', this.selectedWidget);
      this.dataSourceService.getDataFrom(this.selectedWidget.dataSource).subscribe(
        (data) => {
          this.results=data;
          switch(this.widgetType) {
            case this.widgetTypeEnum.Table : {
              break;
             }
            case this.widgetTypeEnum.Card : {
              this.results.forEach(elm => {
                this.result = {
                  key: elm[this.selectedKeys[0].key],
                  label:this.selectedKeys[0].label
                }
              })
              break;
            }
            default : {
              this.dimensionKey = this.selectedWidget.metaDataSources.find(elm => elm.isDimension==true);
              if(this.dimensionKey){
                this.results.forEach((elm) => {
                  let repeat=true;
                  for (let index = 0; index < myLabels.length; index++) {
                   if(myLabels[index]== elm[this.dimensionKey.key]){
                    repeat=false;
                     break;
                   }
                    
                  }
                  if(repeat) myLabels.push(elm[this.dimensionKey.key]);
                });
               this.selectedWidget.metaDataSources.forEach(element=> {
                 if(!element.isDimension){
                   var label = [];
                   this.results.forEach(elm => label.push(elm[element.key]));
                   objet = {
                     label: element.label,
                     backgroundColor: this.generateColor(),
                     data: label
                   };
                   this.datasets.push(objet);
                 }
               })
              } 
              break;

            }
          }
        },
        (error) => {
          console.log(error);
        },
        ()=>{
          this.load=true;
        });
    },
      (err) => console.log(err),
      () => this.load = true); 

    
     

          this.basicData = { labels: myLabels, datasets: this.datasets };
  }
  generateColor() {
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
  }

}
