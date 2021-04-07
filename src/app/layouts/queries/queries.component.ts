import { Component, OnInit } from '@angular/core';
import { DataSource } from 'src/app/models/data-source.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss']
})
export class QueriesComponent implements OnInit {

  queries: DataSource[];
  constructor(private dataSourceService: DataSourceService, private router: Router) { }

  ngOnInit(): void {
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        console.log(data);
        this.queries = data;
      }
    );
  }
  deleteQuery(id: any){
    this.dataSourceService.deleteDataSource(id).subscribe(
      result=> {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/queries']); 
        });
      }
    );
  }

}
