import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogPageComponent } from './log-page/log-page.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [LogPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'logs', component: LogPageComponent}
    ]),
    SharedModule
  ]
})
export class LogModule { }
