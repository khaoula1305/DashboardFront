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

  queries: DataSource[];
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
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'a', sticky: true, severity:'warn', summary:'Query is already used', detail:'Confirm to proceed'});
}
onConfirm() {
  this.messageService.clear('a');
  this.messageService.add({key: 'b', sticky: true, severity:'warn', summary:'Query is removed'});
}

onReject() {
  this.messageService.clear('a');
  this.messageService.clear('b');
}
  deleteQuery(id: any){
    this.dataSourceService.deleteDataSource(id).subscribe(
      (result)=>{
        console.log("result delete if ok", result);
        this.onConfirm();
      },
      (error)=>{
        console.log("result delete", error.status);
        this.showConfirm();
      },
      ()=>{
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/queries']); 
        });
      }
    );
  }

}
