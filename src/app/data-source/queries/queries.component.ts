import { Component, OnInit } from '@angular/core';
import { DataSourceService } from 'src/app/data-source/data-source.service';
import { Router } from '@angular/router';
import {Message, MessageService} from 'primeng/api';
import { DataSource } from '../data-source.model';

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
  msgs:Message[]=[];
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
  if(query.type== "Rest API"){
    this.router.navigate(['/updateDatasource', query.id]);
  }
  else{
    window.open("https://localhost:5001/swagger/index.html", "_blank");
  }
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
        this.msgs=[
          {severity:'success',sticky: true, summary:'Success', detail:'The query was deleted successfully !'}
        ]; 
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/queries']); 
        });
      }
    );
  }

}
