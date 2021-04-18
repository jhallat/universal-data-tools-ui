import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabasePageComponent } from './database-page/database-page.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {databaseReducer} from './state/database.reducer';
import {EffectsModule} from '@ngrx/effects';
import {DatabaseEffects} from './state/database.effects';
import {DatabaseTableComponent} from './table/database-table.component';



@NgModule({
  declarations: [DatabasePageComponent, DatabaseTableComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('database', databaseReducer),
    EffectsModule.forFeature([DatabaseEffects]),
    SharedModule,
    RouterModule.forChild([
      {path: 'database', component: DatabasePageComponent }
    ])
  ]
})
export class DatabaseModule { }
