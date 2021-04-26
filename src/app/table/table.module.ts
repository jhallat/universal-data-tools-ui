import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table-list/table.component';
import { StoreModule } from '@ngrx/store';
import { tableReducer } from './state/table.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TableEffects } from './state/table.effects';
import { SharedModule } from '../shared/shared.module';
import { CreateTableComponent } from './create-table/create-table.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TableComponent,
    CreateTableComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('tables', tableReducer),
    EffectsModule.forFeature([TableEffects]),
    RouterModule.forChild([
      { path: 'create-database-table', component: CreateTableComponent}
    ]),
    SharedModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
