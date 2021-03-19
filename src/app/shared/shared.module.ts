import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt, faEdit, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faTable, faPlug, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';

import { DivisionComponent } from './division/division.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';
import { GroupComponent } from './group/group.component';


@NgModule({
  declarations: [DivisionComponent, PageComponent, GroupComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    FontAwesomeModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatTooltipModule,
    FontAwesomeModule,
    DivisionComponent,
    ReactiveFormsModule,
    PageComponent,
    GroupComponent
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faChevronLeft,
      faTrashAlt,
      faEdit,
      faPlusSquare,
      faTable,
      faPlug,
      faPlay,
      faStop);
  }
}
