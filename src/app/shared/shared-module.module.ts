import { FormatingData } from '../pipes/formating-data.pipe';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [
    FormatingData

  ],
  exports: [
    FormatingData
  ]
})
export class SharedModule {}
