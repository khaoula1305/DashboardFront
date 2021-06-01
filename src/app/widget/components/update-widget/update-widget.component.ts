import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetTypeService } from 'src/app/widget/services/widget-type.service';
import { NgForm } from '@angular/forms';
import { Widget } from 'src/app/widget/models/widget.model';
import { WidgetsService } from 'src/app/widget/services/widgets.service';
import { WidgetTypeEnum } from '../../models/widgetTypeEnum';
import { WidgetType } from '../../models/widget-type';

@Component({
  selector: 'app-update-widget',
  templateUrl: './update-widget.component.html',
  styleUrls: ['./update-widget.component.scss']
})
export class UpdateWidgetComponent implements OnInit {

  load = false;
  widgetTypeEnum = WidgetTypeEnum;
  widgetTypes: WidgetType[];
  widget: Widget;

  constructor(
    private route: ActivatedRoute,
    private widgetTypeService: WidgetTypeService,
    private widgetService: WidgetsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.widgetService.getWidget(id).subscribe((data) => {
        this.widget = data;

        this.widgetService.changeWidget(this.widget);
        this.widgetService.currentWidget.subscribe(
          (widget) => {
            this.widget = widget;
          }
        );

      },
        (err) => console.log(err),
        () => {
          this.load = true;
  });

    this.widgetTypeService.getAllWidgetTypes().subscribe(
      (data) => {
        this.widgetTypes = data;
      },
      (error) => {
      }
    );
  }

  onSubmit(m: NgForm) {
    this.widgetService.updateWidget(this.widget)
      .subscribe((result) => {
        this.router.navigate(['/myWidgets']);
      });
  }

}
