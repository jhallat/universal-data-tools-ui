import { NgModule } from '@angular/core';
import { UdtcPageComponent } from './udtc-page.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [UdtcPageComponent],
  imports: [
    MatButtonModule,
    MatMenuModule,
    CommonModule ],
  exports: [UdtcPageComponent]
})
export class UdtcPageModule { }
