import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StaticWidgetService } from '../../../services/static-widget.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  selectedCurrencies = [];
  results;
  base = {name: 'MAD'};
  host = 'https://api.exchangerate-api.com/v4/latest/';
  currencies: any[] = [];
  allCurrencies: any[] = [];
  @Output() clickDetail = new EventEmitter<any>();

  constructor(private staticWidgetService: StaticWidgetService) { }

  ngOnInit(): void {
    this.staticWidgetService.getDataFromURL(this.host + this.base.name).subscribe(
      data => {
        this.results = data;
        for ( const key in this.results.rates){
          this.currencies.push({name: key});
          this.allCurrencies.push({name: key, value: this.results.rates[key]});
        }
        this.base = this.currencies.find( currency => currency.name === 'MAD');
        this.selectedCurrencies = this.allCurrencies.filter( currency => currency.name === 'USD' || currency.name === 'EUR');
      }
    );
  }
  changeBase(currency ): void {
    this.staticWidgetService.getDataFromURL(this.host + currency.name).subscribe(
      data => {
        this.allCurrencies = [];
        this.selectedCurrencies = [];
        this.results = data;
        for ( const key in this.results.rates){
          this.allCurrencies.push({name: key, value: this.results.rates[key]});
        }
      }
    );
  }
  onDetails(): void {
    this.clickDetail.emit(this.allCurrencies);
  }

}
