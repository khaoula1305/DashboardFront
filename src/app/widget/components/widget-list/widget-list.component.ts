import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Widget } from 'src/app/widget/models/widget.model';
import { WidgetsService } from 'src/app/widget/services/widgets.service';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { MetaDataSource } from 'src/app/widget/models/meta-data-source.model';
import { WidgetTypeEnum } from '../../models/widgetTypeEnum';
@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.scss'],
  providers: [MessageService],

})
export class WidgetListComponent implements OnInit {

  myWidgets: Widget[];
  load = false;
  errDeletingMsgs: Message[];
  err = false;
  widget: any;
  searchText: any;
  visibleSidebar = false;
  selectedWidget: Widget;
  results = [];
  widgetType: string;
  widgetTypeEnum = WidgetTypeEnum;
  result;
  dimensionKey: MetaDataSource;
  datasets: any[] = [];
  basicData: any;

  constructor(
    private widgetService: WidgetsService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.widgetService.getAllWidgets().subscribe(
      (data) => {
        this.myWidgets = data.filter(widget => widget.widgetType.type !== this.widgetTypeEnum.Currency);
      },
      (error) => {
        console.error();
      },
      () => {
        this.load = true;
      }
    );
  }
  updateWidget(widget: any): void {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['upWidget', widget.id]);
    });

  }
  onDeleteWidget(widget: Widget): void {
    this.widget = widget;
    this.widgetService.getAllDashboardWidgets(widget.id).subscribe((data) => {
      if (data.length > 0) {
        this.showConfirm({
          key: 'a',
          sticky: true,
          severity: 'warn',
          summary: 'Widget is already used',
          detail:
            ' This will remove the widget and its associated data and cannot be undone!',
        });
      } else {
        this.showConfirm({
          key: 'a',
          severity: 'custom',
          summary: 'Are you sure you want to remove this widget?',
          detail: ' !',
        });
      }
    });
  }
  showConfirm(message: any): void {
    this.messageService.clear();
    this.messageService.add(message);
  }
  onConfirm(): void {
    this.deleteWidget(this.widget);
    this.messageService.clear('a');
  }

  onReject(): void {
    this.messageService.clear('a');
  }

  deleteWidget(widget: any): void {
    this.widgetService.deleteWidget(widget.id).subscribe((result) => {
      this.changeLocation();
    });
  }

  onShowDetails(widget: Widget): void {
    this.selectedWidget = widget;
    this.visibleSidebar = true;
  }
    // Duplicate Dash
  clone(widget: Widget): void{
    this.widgetService.cloneWidget(widget).subscribe(
        result =>   this.changeLocation()
         );
  }
  changeLocation(): void {
         this.router.navigateByUrl('/NewDashboard', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/widgets']);
        });
  }
}
