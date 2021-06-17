import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { DataSource } from '../../models/data-source.model';
import { DataSourceService } from '../../services/data-source.service';

@Component({
  selector: 'app-query-details',
  templateUrl: './query-details.component.html',
  styleUrls: ['./query-details.component.scss']
})

export class QueryDetailsComponent implements OnInit {

  results: any[] = [];
  cols: any[] = [];
  load = false;
  dataSource: DataSource;

  constructor(private route: ActivatedRoute, private dataSourceService: DataSourceService ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.dataSourceService.getDataSource(id).subscribe(
      (result) => {
        this.dataSource = result;
        this.dataSourceService.getDataFrom(result).subscribe(
          (data) => {
            this.results = data;
            for (const key in data[0]) {
            // show only simple elements => no tables ; no objects
            if (!Array.isArray(data[0][key]) && typeof data[0][key] !== Constants.object ) {
              this.cols.push(key);
            }
          }
            this.load = true;
      });
  });
}
}
