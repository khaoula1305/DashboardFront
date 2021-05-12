import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../../services/data-source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from 'src/app/models/data-source.model';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-query-details',
  templateUrl: './query-details.component.html',
  styleUrls: ['./query-details.component.scss']
})

export class QueryDetailsComponent implements OnInit {

  results: any[]=[];
  cols: any[]=[];
  cols2: any[]=[];
  load= false;
  dataSource: DataSource;
  files1: TreeNode<any>[]=[];
  selectedFiles: TreeNode<any>[]=[];
  treeNode : TreeNode;
  constructor(private route: ActivatedRoute, private dataSourceService: DataSourceService ) { }
   flatToString(obj, out){
    if(Array.isArray(obj)){
      out+= ' \n [';
      obj.forEach(element => {
        out+=this.flatToString(element, out);
      });
     out+= '] ';
    }
    else if (typeof obj == 'object') {
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
      if( obj[key] !== null && (Array.isArray(obj[key]) || typeof obj[key] == 'object')){
        out[key] = this.flatToString(obj[key], '');
      }
       else {
           out[key] = obj[key]
       }
    })
    return out
  }
  ConvertJson= (out : TreeNode<any>[], obj: any )=>{
    if(!Array.isArray(obj)){
      Object.entries(obj).forEach(([cle, valeur]) => {
        if( valeur !== null && (Array.isArray(valeur) || typeof valeur == 'object')){
         out.push({data: valeur, label: cle, children: this.ConvertJson([],valeur)});
        }
         else {
          out.push({data: valeur, label: cle});
         }
      });
    }else{
      this.ConvertJson(out, obj.pop());
    }
    return out
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.dataSourceService.getDataSource(id).subscribe(
      (result)=>{
        this.dataSource=result;
        this.dataSourceService.getDataFrom(result).subscribe(
          (data) => {
            data.forEach(elm => {
              this.results.push(this.flat(elm,{}));
            });
            this.ConvertJson(this.files1,data);
           for (let key in this.results[0]) {
            this.cols.push( { field: key, header: key });
          }
          console.log(this.files1);
          this.cols2 = [
            { field: 'label', header: 'label' },
            { field: 'label', header: 'label' }
        ];
          },
          (error) => {
            console.log(error);
            },
            () => {
           this.load=true;
            });
      }
    );

  }
  nodeSelect(event){
    console.log('event', event);
    console.log('selected', this.selectedFiles);
  }
  nodeUnselect(event){
    console.log(event);
  }


}
