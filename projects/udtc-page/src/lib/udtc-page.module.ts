import { NgModule } from '@angular/core';
import { UdtcPageComponent } from './udtc-page.component';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [UdtcPageComponent],
  imports: [
    MatMenuModule
  ],
  exports: [UdtcPageComponent]
})
export class UdtcPageModule { }
