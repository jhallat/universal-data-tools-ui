import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionComponent } from './connection.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { connectionReducer } from './state/connection.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ConnectionEffects } from './state/connection.effects';


@NgModule({
  declarations: [ConnectionComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('connection', connectionReducer),
    EffectsModule.forFeature([ConnectionEffects]),
    RouterModule.forChild([
      {path: 'connection', component: ConnectionComponent }
    ]),
    SharedModule
  ]
})
export class ConnectionModule { }
