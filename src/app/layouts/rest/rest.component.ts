import { Component, OnInit } from '@angular/core';
import { Rest } from '../../models/rest.model';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSourceService } from 'src/app/services/data-source.service';
import {Message,MessageService} from 'primeng/api';
@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.scss'],
  providers: [MessageService]
})
export class RestComponent implements OnInit {

  dataSource: Rest= new Rest();
  authenticationType:any[];
  selectedAuthetification:any;
  headers:any[];
  params:any[];
  token;
  cols: any[]=[];
  results:any[];
  msgs:Message[]=[];
  constructor(private dataSourceService: DataSourceService, private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {

    this.authenticationType=[
      {name:'Basic Auth'},
      {name:'Bearer Token'},
      {name:'OAuth 2.0'},
      {name:'Other'}
    ];
    this.headers=[];
    this.params=[];
  }
  DeleteParam(param){
    var removeIndex = this.params.map(function (item) { return item.id; }).indexOf(param);
    this.params.splice(removeIndex, 1);
  }
  addParam(){
    this.params.push( {code: "Code", value:"Value"});
  }
  DeleteHeader(header){
    var removeIndex = this.headers.map(function (item) { return item.id; }).indexOf(header);
    this.headers.splice(removeIndex, 1);
  }
  addHeader(){
    this.headers.push( {code: "API_key", value:"Your access"});
  }
TestConnection(){
  let url=this.dataSource.url;
  this.saveRest();
  this.dataSourceService.GetDataAsync(this.dataSource).subscribe(
    (data)=>{
    },
    (error)=>{
      this.msgs=[
        {severity:'warn',sticky: true, summary:'Error', detail:'Connection Failed: Error:'}
      ]; 
    },
    ()=>{
      this.dataSource.url=url;
      this.msgs=[
        {severity:'success',sticky: true, summary:'Connection Successful.'}
      ]; 
    }
  )
}
Preview(){
  let url=this.dataSource.url;
  this.saveRest();
  this.dataSourceService.GetDataAsync(this.dataSource).subscribe(
    (data)=>{
      this.results=data;
      for (let key in this.results[0]) {
        this.cols.push( { field: key, header: key });
      }
    },
    (error)=>{
      this.results=[];
      this.msgs=[
        {severity:'warn',sticky: true, summary:'Error', detail:'Connection Failed: Error:'}
      ]; 
    },
    ()=>{
      this.dataSource.url=url;
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
    if (rest.untouched || rest.invalid) {
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

  onSelectedKey(key: string) {

    let id = this.getAssignedIdInsideFirstList(key);

    this.selectedKeys.push({ id, key, label: key});

    console.log("selected keys", this.selectedKeys);

    this.removeSelectedKeyFromFirstList(id);

  }

  onRemovedKey(key: string) {

    let id = this.getAssignedIdInsideSecondList(key);

    this.restResult.push({ id, key, label: key });

    this.removeSelectedKeyFromSecondList(id);

    console.log("after remove",this.selectedKeys);
  }

   getAssignedIdInsideFirstList(selectedKey: string){
     let res;
     let item = this.restResult.find(i => i.key === selectedKey);
     res= item.id; 
     return res;
   }

   getAssignedIdInsideSecondList(selectedKey: string){
    let res;
    let item = this.selectedKeys.find(i => i.key === selectedKey);
    res= item.id; 
    return res;
  }

   removeSelectedKeyFromFirstList(id: string) {

    // get index of object with id
    var removeIndex = this.restResult.map(function (item) { return item.id; }).indexOf(id);

    // remove object
    this.restResult.splice(removeIndex, 1);

  }

  removeSelectedKeyFromSecondList(id: string) {

    // get index of object with id
    var removeIndex = this.selectedKeys.map(function (item) { return item.id; }).indexOf(id);

    // remove object
    this.selectedKeys.splice(removeIndex, 1);

  }

  addLabel(label: string){

  }





  onNext() {
    this.configureRest = true;

    this.dataSourceService.getDataFromURL(this.dataSource.url).subscribe(
      (data) => {
        //debugger
        //this.restResult = data;

        // console.log("result data[0]",data[0]);
        let uuid = UUID.UUID();
        for (let key in data[0]) {
          uuid = UUID.UUID();
          this.restResult.push({ id: uuid, key, label: 'label 1' });
          //console.log("restResult", this.restResult);

        }

        console.log("restResult", this.restResult);



        //console.log(" metaDataSourceList of restResult", this.restResult[0].metaDataSourceList);

        //this.dataSource.metaDataSourceList= this.restResult[0].metaDataSourceList;
        //console.log("keys", this.keys);
      }
    );
  }

}
function getAssignedId(key: any, number: any) {
  throw new Error('Function not implemented.');
}

