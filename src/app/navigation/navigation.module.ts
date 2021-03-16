import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationContainerComponent } from './navigation-container/navigation-container.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ConnectionGuard } from '../connection/connection.guard';



@NgModule({
  declarations: [NavigationContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'navigation', component: NavigationContainerComponent, canActivate: [ConnectionGuard]}
    ]),
    SharedModule
  ]
})
export class NavigationModule { }
