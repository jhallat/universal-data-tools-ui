import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabasePageComponent } from './database-page/database-page.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {databaseReducer} from './state/database.reducer';
import {EffectsModule} from '@ngrx/effects';
import {DatabaseEffects} from './state/database.effects';
import {DatabaseTableComponent} from './database-table/database-table.component';
import {DatabaseCreateTableComponent} from './create-table/database-create-table.component';
import {DatabaseEmptyComponent} from './database-empty/database-empty.component';
import {CreateDatabaseComponent} from './create-database/create-database.component';



@NgModule({
  declarations: [DatabasePageComponent,
    DatabaseTableComponent,
    DatabaseEmptyComponent,
    DatabaseCreateTableComponent,
    CreateDatabaseComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('database', databaseReducer),
    EffectsModule.forFeature([DatabaseEffects]),
    SharedModule,
    RouterModule.forChild([
      {path: 'database',
       component: DatabasePageComponent,
      children: [
        {path: 'table', component: DatabaseTableComponent},
        {path: 'create-database', component: CreateDatabaseComponent},
        {path: 'create-database-table', component: DatabaseCreateTableComponent},
        {path: '**', component: DatabaseEmptyComponent}
      ]}
    ])
  ]
})
export class DatabaseModule { }
