import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { dataReducer } from './state/data.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DataEffects } from './state/data.effects';
import { SelectDataMessageComponent } from './select-data-message/select-data-message.component';
import { RouterModule } from '@angular/router';
import { DataComponent } from './display-data/data.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { SharedModule } from '../shared/shared.module';
import { DataItemResolver } from './data-item-resolver.service';

@NgModule({
  declarations: [
    SelectDataMessageComponent,
    DataComponent,
    EditItemComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('data', dataReducer),
    EffectsModule.forFeature([DataEffects]),
    RouterModule.forChild([
      { path: 'data/edit/:tableName', component: EditItemComponent, resolve: { resolvedData: DataItemResolver} },
      { path: 'data/:tableName', component: DataComponent},
      { path: '**', component: SelectDataMessageComponent}
    ]),
    SharedModule
  ]
})
export class DataModule {

 }
