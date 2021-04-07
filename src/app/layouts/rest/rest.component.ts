import { Component, OnInit } from '@angular/core';
import { DataSource } from '../../models/data-source.model';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSourceService } from 'src/app/services/data-source.service';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.scss']
})
export class RestComponent implements OnInit {

  dataSource: DataSource= new DataSource();
  constructor(private dataSourceService: DataSourceService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(rest: NgForm) {
    if ( rest.untouched || rest.invalid) {
      alert('Required');
    } else {
      this.dataSource.title = rest.value.title;
      this.dataSource.url= rest.value.url;
      this.dataSource.type= 'Rest API';
      this.dataSourceService.addDataSource(this.dataSource).subscribe(
        result => this.router.navigate(['/queries'])
         );
         
    }
  }
}
