import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabasePageComponent } from './database-page/database-page.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DatabasePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'database', component:DatabasePageComponent }
    ])
  ]
})
export class DatabaseModule { }
