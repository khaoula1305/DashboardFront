import { Component, OnInit } from '@angular/core';
import { Rest } from '../../models/rest.model';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSourceService } from 'src/app/services/data-source.service';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.scss']
})
export class RestComponent implements OnInit {

  dataSource: Rest= new Rest();
  authenticationType:any[];
  selectedAuthetification:any;
  headers:any[];
  params:any[];
  token;
  isConnection=false;
  constructor(private dataSourceService: DataSourceService, private router: Router) { }

  ngOnInit(): void {
    this.authenticationType=[
      {name:'Basic'},
      {name:'OAuth 2.0'},
      {name:'Other'}
    ];
    this.headers=[
      {code: "apiKay", value:"Your api"},

    ];
    this.params=[
      {code: "access_key", value:"Your access"},

    ]
  }
  onClick(){
    console.log(this.selectedAuthetification);
  }
  onChange(event){
    console.log(event);
  }
  DeleteParam(param){
    var removeIndex = this.params.map(function (item) { return item.id; }).indexOf(param);
    this.params.splice(removeIndex, 1);
   // this.params.splice(this.params.findIndex(param),1)
  }
  addParam(){
    this.params.push( {code: "access_key", value:"Your access"});
  }
  DeleteHeader(header){
    this.headers.splice(this.headers.findIndex(header),1)
  }
  addHeader(){
    this.headers.push( {code: "API_key", value:"Your access"});
  }
TestConnection(){
  this.isConnection=true;
}
  onSubmit(rest: NgForm) {
    if ( rest.untouched || rest.invalid) {
      alert('Required');
    } else {
      this.dataSource.title = rest.value.title;
      this.dataSource.url= rest.value.url;
      this.headers.forEach(elm =>{
        if(elm.value!="Your access"){
          this.dataSource.url=this.dataSource.url+'?'+elm.code+'='+elm.value;
        }
      });
      this.dataSource.type= 'Rest API';
      this.dataSourceService.addDataSource(this.dataSource).subscribe(
        result => this.router.navigate(['/queries'])
         );
         
    }
  }
}
