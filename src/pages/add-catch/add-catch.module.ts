import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCatchPage } from './add-catch';

@NgModule({
  declarations: [
    AddCatchPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCatchPage),
  ],
})
export class AddCatchPageModule {}
