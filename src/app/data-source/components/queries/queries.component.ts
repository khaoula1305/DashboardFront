import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { DataSource } from '../../models/data-source.model';
import { DataSourceService } from '../../services/data-source.service';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class QueriesComponent implements OnInit {
  searchText:any;
  queries: DataSource[];
  query: any;
  constructor(
    private dataSourceService: DataSourceService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.queries = data;
      }
    );
  }
  queryDetails(queryId : any){
    this.router.navigate(['queries/queryDetails', queryId]);

  }
updateQuery(query: DataSource){
  if(query.type== Constants.restAPI){
    this.router.navigate(['queries/updateDatasource', query.id]);
  }
  else{
    window.open(Constants.queryBuilderURL, "_blank");
  }
}
onDelete(query: DataSource){
  let message;
  this.dataSourceService.getAllWidgets(query.id).subscribe(
    (data) => {
      if(data.length>0){
       message= ' This will remove the data and its associated widget and cannot be undone!';
      } else{
       message= 'Are you sure you want to remove this Query?';
      }
      this.confirmationService.confirm({
        message: message,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.dataSourceService.deleteDataSource(query.id).subscribe(
            (result)=>{
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'The query was deleted successfully !'});
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/queries']);
            });
            }
          );
        },
        reject: (type) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
    }
  );
}
}
