import { Component, OnInit } from '@angular/core';
import { DataSource } from '../../models/data-source.model';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSourceService } from 'src/app/services/data-source.service';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.scss']
})
export class RestComponent implements OnInit {

  dataSource: DataSource = new DataSource();

  selectedKeys: MetaDataSource[] = [];

  restResult: MetaDataSource[] = [];

  configureRest = false;

  constructor(private dataSourceService: DataSourceService, private router: Router) { }

  ngOnInit(): void {


  }
  onSubmit(rest: NgForm) {
    if (rest.untouched || rest.invalid) {
      alert('Required');
    } else {
      this.dataSource.title = rest.value.title;
      this.dataSource.url = rest.value.url;
      this.dataSource.metaDataSourceList = this.selectedKeys;
      console.log(this.dataSource);
      this.dataSourceService.addDataSource(this.dataSource).subscribe(
        result => this.router.navigate(['/queries'])
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

