import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../constants/constants';

@Pipe({
    name: 'formatingData'
})
export class FormatingData implements PipeTransform {

    constructor() { }

    transform(value: any) {
        // get just 2 numbers after , from float numbers
        // let res;
        const isFloat = (n) => {
            return n === +n && n !== (n | 0);
          };
        if (typeof(value) == Constants.number) {
           if (isFloat(value)) {
               // res = isFloat(+value) ? (+value).toFixed(2) : value;
               return value.toLocaleString('fr-FR',  {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              });
            }
           return value.toLocaleString('fr-FR');
       }  else if (typeof(value) == Constants.string) {
           return value;
        }
    }
}
