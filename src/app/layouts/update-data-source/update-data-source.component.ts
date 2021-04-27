import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rest } from 'src/app/models/rest.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-update-data-source',
  templateUrl: './update-data-source.component.html',
  styleUrls: ['./update-data-source.component.scss'],
  providers: [MessageService]

})
export class UpdateDataSourceComponent implements OnInit {

 
  dataSource: Rest= new Rest();
  authenticationType:any[];
  selectedAuthetification:any;
  headers:any[];
  params:any[];
  token;
  load=false;
  msgs:Message[]=[];
  constructor(
    private dataSourceService: DataSourceService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.dataSourceService.getDataSource(id).subscribe(
      data => {
        console.log(data);
       this.dataSource = data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.load=true;
      }
    );
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
    this.dataSourceService.GetDataAsync(this.dataSource).subscribe(
      (data)=>{
      },
      (error)=>{
        this.msgs=[
          {severity:'warn',sticky: true, summary:'Error', detail:'Connection Failed: Error:'}
        ]; 
      },
      ()=>{
        this.msgs=[
          {severity:'success',sticky: true, summary:'Connection Successful.'}
        ]; 
      }
    )
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
      this.dataSourceService.updateDataSource(this.dataSource).subscribe(
        result =>{
         this.router.navigate(['/queries'])
        }
         );
         
    }
  }
}
