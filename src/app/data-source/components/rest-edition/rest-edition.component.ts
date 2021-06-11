import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {Message, MessageService, TreeNode} from 'primeng/api';
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

  dataSource: Rest = new Rest();
  authenticationType: any[];
  selectedAuthetification: any;
  headers: any[];
  params: any[];
  token;
  cols: any[] = [];
  results: any[] = [];
  msgs: Message[] = [];
  files1: TreeNode<any>[];
  selectedFiles: TreeNode;

  // Flotten
  notNormal = false;
  display = false;
  resultsFormatedToTree: TreeNode<any>[] = [];
  cols2: any[] = [];
  selectedItems: any[] = [];
  selectedItem: TreeNode;
  informationCard = true;
  displayCard = false;

  constructor(private dataSourceService: DataSourceService, private router: Router) { }


  ngOnInit(): void {
    this.dataSource.path = '';
    this.authenticationType = [
      {name: 'Basic Authentication'},
      {name: 'Bearer Token'},
      {name: 'Other'}
    ];
    this.headers = [];
    this.params = [];
  }
  DeleteParam(param): void {
    const removeIndex = this.params.map(function(item) { return item.id; }).indexOf(param);
    this.params.splice(removeIndex, 1);
  }
  addParam(): void {
    this.params.push( {code: 'Code', value: 'Value'});
  }
  deleteHeader(header): void {
    const removeIndex = this.headers.map(function(item) { return item.id; }).indexOf(header);
    this.headers.splice(removeIndex, 1);
  }
  addHeader(): void {
    this.headers.push( {code: 'API_key', value: 'Your access'});
  }
 testConnection(): void {
  const url = this.dataSource.url;
  this.saveRest();
  this.dataSourceService.GetDataAsync(this.dataSource).subscribe(
    (data) => {
    },
    (error) => {
      this.msgs = [
        {severity: 'warn', sticky: true, summary: 'Error', detail: 'Connection Failed: Error:'}
      ];
    },
    () => {
      this.dataSource.url = url;
      this.msgs = [
        {severity: 'success', sticky: true, summary: 'Connection Successful.'}
      ];
    }
  );
}
// Next step
preview(): void {
  const url = this.dataSource.url;
  this.saveRest();
  this.display = true;
  this.dataSourceService.GetDataAsync(this.dataSource).subscribe(
    (data) => {
      this.informationCard = false;
      this.displayCard = true;
      this.results = [];
      this.cols = [];
      this.resultsFormatedToTree = [];
      this.notNormal = false;
      if (Array.isArray(data)){
        this.results = data;
      }else{
        this.results.push(data);
      }
      this.selectedItems = this.results.filter(elm => !( Array.isArray(elm) && typeof elm === Constants.object));
      console.log(this.selectedItems);
      for (const key in this.results[0]) {
        if (Array.isArray(this.results[0][key]))  {
          this.notNormal = true;
          this.ConvertJson(this.resultsFormatedToTree, this.results);
          this.results = [];
          this.cols = [];
          break;
        }
        this.cols.push( { field: key, header: key });
      }
    },
    (error) => {
      this.notNormal = false;
      this.results = [];
      this.msgs = [
        {severity: 'warn', sticky: true, summary: 'Error', detail: 'Connection Failed: Error:'}
      ];
    },
    () => {
      this.dataSource.url = url;
    }
  );
}
saveRest(): void {
  if (this.params.length > 0){
    this.dataSource.url = this.dataSource.url + '?';
    let i = 0;
    this.params.forEach(elm => {
      if (i > 0) {   this.dataSource.url += '&'; }
      i++;
      this.dataSource.url += elm.code + '=' + elm.value;
      }
  );
  }
  this.dataSource.type = Constants.restAPI;
}
  ConvertJson = (out: TreeNode<any>[], obj: any ) => {
    if (Array.isArray(obj)){
      this.ConvertJson(out, obj[0]);
    }
   else{
      Object.keys(obj).forEach(key => {
        const valeur = obj[key];
        const cle = key;
        if ( valeur !== null && (Array.isArray(valeur))){
         out.push({data: valeur, label: cle, children: this.ConvertJson([], valeur), selectable : true});
        } else if ( valeur !== null &&  typeof valeur === Constants.object){
          out.push({data: valeur, label: cle, children: this.ConvertJson([], valeur), selectable : false});
         }
         else {
          out.push({data: valeur, label: cle, selectable : false});
         }
      });
    }
    return out;
  }
  generatePath(path , node){
    path += node.label + ',';
    if (node.parent === undefined) { return path; }
    this.generatePath(path, node.parent);
  }
  tabeSelect(event): void {
    this.cols2 = [];
    this.selectedItems = event.node.data;
    this.dataSource.path = this.generatePath('', event.node);
    for (const key in this.selectedItems[0] ) {
      this.cols2.push( { field: key, header: key });
    }
  }
  onSubmit(rest: NgForm): void  {
      this.saveRest();
      this.dataSourceService.addDataSource(this.dataSource).subscribe(
        result => {
         this.router.navigate(['/queries']);
        }
        );
  }
}
