import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Widget } from 'src/app/models/widget.model';
import { WidgetsService } from 'src/app/services/widgets.service';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';

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
  widgetId: any;

  constructor(private widgetService: WidgetsService, private router: Router, private primengConfig: PrimeNGConfig,
    private messageService: MessageService) { }

  ngOnInit(): void {
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

  onDeleteWidget(widget: Widget){
    this.deleteWidget(this.widgetId);
    //this.showConfirm();
  }
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'a', sticky: true, severity:'warn', summary:'Widget already used', detail:' '});
}
  onConfirm() {
    this.deleteWidget(this.widgetId);
    this.messageService.clear('a');
  }
  
  onReject() {
    this.messageService.clear('a');
  }

  deleteWidget(widgetId: any){
    console.log('widget Id', widgetId);
    this.widgetService.deleteWidget(widgetId).subscribe(
      (result)=>{
        console.log("result delete if ok", result);
      },
      (error)=>{
        console.log("result delete", error.status);
        this.showConfirm();
      },
      ()=>{
      this.router.navigateByUrl('/NewDashboard', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/myWidgets']); 
        });
      }
    );
  }

}
