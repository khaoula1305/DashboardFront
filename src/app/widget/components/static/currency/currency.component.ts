import { Component, OnInit } from '@angular/core';
import { StaticWidgetService } from '../../../services/static-widget.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  selectedCurrencies=[];
  results;
  base={name: 'MAD', value: 1};
  host='https://api.exchangerate-api.com/v4/latest/';
  currencies: any[]=[];
  allCurrencies: any[]=[];
  constructor(private staticWidgetService:StaticWidgetService) { }

  ngOnInit(): void {
    this.allCurrencies.push(this.base);
    this.staticWidgetService.getDataFromURL(this.host+this.base.name).subscribe(
      data=>{
        this.results=data;
        for( let key in this.results['rates']){
          if(key== 'USD' || key== 'EUR')
                  this.selectedCurrencies.push({name: key, value: this.results['rates'][key]});
          this.currencies.push({name: key, value: this.results['rates'][key]});
          this.allCurrencies.push({name: key, value: this.results['rates'][key]});
        }
      }
    )
  }
  changeBase(currency ){
    this.staticWidgetService.getDataFromURL(this.host+currency.name).subscribe(
      data=>{
        this.results=data;
        for( let key in this.results['rates']){
          this.currencies.push({name: key, value: this.results['rates'][key]});
        }
      }
    )
  }


}
