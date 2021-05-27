import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Message,MessageService, TreeNode} from 'primeng/api';
import { Constants } from 'src/app/constants/constants';
import { Rest } from '../../models/rest.model';
import { DataSourceService } from '../../services/data-source.service';

@Component({
  selector: 'app-rest-edition',
  templateUrl: './rest-edition.component.html',
  styleUrls: ['./rest-edition.component.scss'],
  providers: [MessageService]
})
export class RestEditionComponent implements OnInit {

  dataSource: Rest= new Rest();
  authenticationType:any[];
  selectedAuthetification:any;
  headers:any[];
  params:any[];
  token;
  cols: any[]=[];
  results:any[];
  msgs:Message[]=[];
  files1: TreeNode<any>[];
  selectedFiles: TreeNode;

  // Flotten
  displayAll=false;
  resultsFormatedToTree: TreeNode<any>[]=[];
  cols2: any[]=[];
  selectedItems: any[]=[];
  selectedItem: TreeNode;
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
preview(){
  this.displayAll=true;
  let url=this.dataSource.url;
  this.saveRest();
  this.dataSourceService.GetDataAsync(this.dataSource).subscribe(
    (data)=>{
      this.results=data;
      for (let key in this.results[0]) {
        this.cols.push( { field: key, header: key });
      }
      this.resultsFormatedToTree=[];
      this.ConvertJson(this.resultsFormatedToTree,this.results);
    },
    (error)=>{
      this.displayAll=false;
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
  this.dataSource.type= Constants.restAPI;
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
  ConvertJson= (out : TreeNode<any>[], obj: any )=>{
    if(Array.isArray(obj)){
      this.ConvertJson(out,obj[0]);
    }
   else{
      Object.keys(obj).forEach(key => {
        let valeur=obj[key];
        let cle=key;
        if( valeur !== null && (Array.isArray(valeur) || typeof valeur == Constants.object)){
         out.push({data: valeur, label: cle, children: this.ConvertJson([],valeur)});
        }
         else {
          out.push({data: valeur, label: cle});
         }
      });
    }
    return out
  }
  nodeSelect(event){
    console.log(event);
    this.cols2=[];
    if(Array.isArray(event.node.data)){
      this.selectedItems=event.node.data;
    }else{
      if(event.node.parent != undefined){
        this.selectedItems=event.node.parent.data;
        console.log(this.results[event.node.parent.label][0][event.node.label]);
      }else{
    
       this.selectedItems=this.results.filter(elm => !( Array.isArray(elm) && typeof elm == Constants.object));
      }
    }
    for (let key in this.selectedItems[0] ) {
      this.cols2.push( { field: key, header: key });
    }
  }
  nodeUnselect(event){
    console.log(event);
  }

}
