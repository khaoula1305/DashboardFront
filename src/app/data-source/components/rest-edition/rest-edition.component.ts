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
  results:any[]=[];
  msgs:Message[]=[];
  files1: TreeNode<any>[];
  selectedFiles: TreeNode;

  // Flotten
  notNormal=false;
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
next(){
  //s'il y a un tableau normal 
  this.preview();
  //sinon on invite l'utilisateur à choisir un tableau
}

preview(){
  let url=this.dataSource.url;
  this.saveRest();
  this.dataSourceService.GetDataAsync(this.dataSource).subscribe(
    (data)=>{
      this.results=[];
      this.cols=[];
      this.resultsFormatedToTree=[];
      this.notNormal=false;
      if(Array.isArray(data)){
        this.results= data;
      }else{
        this.results.push(data);
      }
      this.selectedItems=this.results.filter(elm => !( Array.isArray(elm) && typeof elm == Constants.object));
      for (let key in this.results[0]) {
        if(Array.isArray(this.results[0][key]))  {
          this.notNormal=true;
          this.ConvertJson(this.resultsFormatedToTree,this.results);
          this.results=[];
          this.cols=[];
           break;
        } 
        this.cols.push( { field: key, header: key });
      }
    },
    (error)=>{
      this.notNormal=false;
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
  ConvertJson= (out : TreeNode<any>[], obj: any )=>{
    if(Array.isArray(obj)){
      this.ConvertJson(out,obj[0]);
    }
   else{
      Object.keys(obj).forEach(key => {
        let valeur=obj[key];
        let cle=key;
        if( valeur !== null && (Array.isArray(valeur))){
         out.push({data: valeur, label: cle, children: this.ConvertJson([],valeur), selectable :true});
        } else if( valeur !== null &&  typeof valeur == Constants.object){
          out.push({data: valeur, label: cle, children: this.ConvertJson([],valeur), selectable :false});
         }
         else {
          out.push({data: valeur, label: cle, selectable :false});
         }
      });
    }
    return out
  }
  generatePath(path , node){
    path+= node.label+',';
    if(node.parent == undefined) return path;
    this.generatePath(path, node.parent)
  }
  tabeSelect(event){
    this.cols2=[];
    this.selectedItems=event.node.data;
    this.dataSource.path=this.generatePath('', event.node);
    console.log(this.dataSource.path);
    for (let key in this.selectedItems[0] ) {
      this.cols2.push( { field: key, header: key });
    }
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

}
