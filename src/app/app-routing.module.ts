import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ErrorPageComponent} from './error-page/error-page.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'error', component: ErrorPageComponent},
    {path: '**', redirectTo: '/connection'}
  ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
