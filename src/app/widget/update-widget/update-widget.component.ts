import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetType } from 'src/app/widget/widget-types/widget-type';
import { WidgetTypeService } from 'src/app/widget/widget-type.service';
import { NgForm } from '@angular/forms';
import { WidgetTypeEnum } from 'src/app/widget/widget-types/widgetTypeEnum';
import { Widget } from 'src/app/widget/widget.model';
import { WidgetsService } from 'src/app/widget/widgets.service';

@Component({
  selector: 'app-update-widget',
  templateUrl: './update-widget.component.html',
  styleUrls: ['./update-widget.component.scss']
})
export class UpdateWidgetComponent implements OnInit {

  load: boolean = false;
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
    this.widget = new Widget();
    this.widgetService.changeWidget(this.widget);
    const id = this.route.snapshot.params.id;
    this.widgetService.currentWidget.subscribe(
      (widget) => {
        this.widget = widget;
      }
    );

      this.widgetService
      .getAllWidgets()
      .subscribe((data) => {
        this.widget = data.find((e) => e.id == id);
        this.widgetService.changeWidget(this.widget);
      },
        (err) => console.log(err),
        () => this.load = true);

    this.widgetTypeService.getAllWidgetTypes().subscribe(
      (data) => {
        this.widgetTypes = data;
      },
      (error) => {
        console.log(error);
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
