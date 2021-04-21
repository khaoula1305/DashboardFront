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
      {name:'Basic Auth'},
      {name:'Bearer Token'},
      //{name:'OAuth 2.0'},
      {name:'Other'}
    ];
    this.headers=[

    ];
    this.params=[

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
  //Function here for testing
  this.isConnection=true;

}
saveRest(){
  if(this.params.length>0){
    this.dataSource.url=this.dataSource.url+'?';
    let i=0;
    this.params.forEach(elm =>{
      if(i>0)   this.dataSource.url+='&';
      i++;
      this.dataSource.url+=elm.code+'='+elm.value;
      }
  );
  }
  this.dataSource.type= 'Rest API';
}
  onSubmit(rest: NgForm) {
    if ( rest.untouched || rest.invalid) {
      alert('Required');
    } else {
      this.saveRest();
      this.dataSourceService.addDataSource(this.dataSource).subscribe(
        result =>{
         this.router.navigate(['/queries'])
        }
         );
         
    }
  }
}
