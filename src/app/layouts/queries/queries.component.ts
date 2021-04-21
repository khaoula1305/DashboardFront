import { Component, OnInit } from '@angular/core';
import { DataSource } from 'src/app/models/data-source.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss'],
  providers: [MessageService]

})
export class QueriesComponent implements OnInit {
  searchText:any;
  queries: DataSource[];
  query: any;
  constructor(
    private dataSourceService: DataSourceService, 
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.queries = data;
      }
    );
  }
  queryDetails(queryId : any){
    this.router.navigate(['/queryDetails', queryId]);

  }
  showConfirm(message: any) {
    this.messageService.clear();
    this.messageService.add(message);
}
onConfirm() {
  this.messageService.clear('a');
  this.deleteQuery(this.query);}

onReject() {
  this.messageService.clear('a');
}
updateQuery(query: DataSource){

}
onDelete(query: DataSource){
  this.query=query;
  this.dataSourceService.getAllWidgets(query.id).subscribe(
    (data) => {
      if(data.length>0){
        this.showConfirm({key: 'a', sticky: true, severity:'warn', summary:'Query is already used', detail:' This will remove the data and its associated widget and cannot be undone!'});
      } else{
        this.showConfirm({key: 'a', sticky: true, severity:'custom', summary:'Are you sure you want to remove this Query?', detail:' !'});
      }
    }
  );
}
  deleteQuery(query: DataSource){
    this.dataSourceService.deleteDataSource(query.id).subscribe(
      (result)=>{
      },
      (error)=>{

      },
      ()=>{
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/queries']); 
        });
      }
    );
  }

}
