import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Constants } from 'src/app/constants/constants';
import { DataSource } from '../../models/data-source.model';
import { DataSourceService } from '../../services/data-source.service';

@Component({
  selector: 'app-query-details',
  templateUrl: './query-details.component.html',
  styleUrls: ['./query-details.component.scss']
})

export class QueryDetailsComponent implements OnInit {

  results: any[]=[];
  resultsFormated: any[]=[];
  selectedTable=[];
  selectedTableCols=[];
  resultsWithoutTable=[];
  cols: any[]=[];
  load= false;
  displayAll= true;
  dataSource: DataSource;
  customTable:any;

  constructor(private route: ActivatedRoute, private dataSourceService: DataSourceService ) { }
  flatToString(obj, out){
    if(Array.isArray(obj)){
      out+= ' [';
      obj.forEach(element => {
        out+=this.flatToString(element, out);
      });
     out+= '] ';
    }
    else if (typeof obj == Constants.object) {
         out+=' {' ;
         Object.keys(obj).forEach(key => {
           out+='\"'+key+"\":"+obj[key]+", ";
         })
         out+= "} , ";
     }
     return out;
   }
   flat = (obj, out) => {
    Object.keys(obj).forEach(key => {
      if( obj[key] !== null && (Array.isArray(obj[key]) || typeof obj[key] == Constants.object)){
        out[key] = this.flatToString(obj[key], '');
      }
       else {
           out[key] = obj[key]
       }
    })
    return out
  }
  showTable(item){
    this.selectedTable=[];
    this.selectedTableCols=[];
    if(Array.isArray(this.results[0][item])){
      this.selectedTable=this.results[0][item];
      for (let key in this.selectedTable[0]) {
        this.selectedTableCols.push( { field: key, header: key });
      }
    }
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.dataSourceService.getDataSource(id).subscribe(
      (result)=>{
        this.dataSource=result;
        this.dataSourceService.getDataFrom(result).subscribe(
          (data) => {
            this.results=data;
           for (let key in this.results[0]) {
            this.cols.push( { field: key, header: key });
          }
          this.results.forEach(elm => {
            this.resultsFormated.push(this.flat(elm,{}));
          });
          this.customTable=[];
          this.cols.forEach(elm=>{
            this.customTable.push(elm.header);
          });
          },
          (error) => {
            },
            () => {
           this.load=true;
            });
      }
    );

  }



}
