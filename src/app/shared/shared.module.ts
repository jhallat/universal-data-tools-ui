import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt, faEdit, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faTable, faPlug } from '@fortawesome/free-solid-svg-icons';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DivisionComponent } from './division/division.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DivisionComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    FontAwesomeModule,
    DivisionComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faChevronLeft, faTrashAlt, faEdit, faPlusSquare, faTable, faPlug);
  }
}
