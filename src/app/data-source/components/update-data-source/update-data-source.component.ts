import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rest } from 'src/app/data-source/models/rest.model';
import {Message, MessageService} from 'primeng/api';
import { DataSourceService } from '../../services/data-source.service';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-update-data-source',
  templateUrl: './update-data-source.component.html',
  styleUrls: ['./update-data-source.component.scss'],
  providers: [MessageService]

})
export class UpdateDataSourceComponent implements OnInit {


  dataSource: Rest = new Rest();
  msgs: Message[] = [];
  informationCard= true;
  load= false;
  constructor(
    private dataSourceService: DataSourceService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.dataSourceService.getDataSource(id).subscribe(
      data => {
       this.dataSource = data;
      },
      (error) => {
      },
      () => {
        this.load = true;
      }
    );
  }
  onSubmit(rest: NgForm): void {
      this.dataSourceService.updateDataSource(this.dataSource).subscribe(
        result => {
         this.router.navigate(['/queries']);
        }
         );
  }
}
