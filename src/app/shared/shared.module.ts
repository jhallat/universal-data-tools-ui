import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt, faEdit, faPlusSquare, faMinusSquare } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faTable, faPlug, faPlay, faStop, faSearch, faTools} from '@fortawesome/free-solid-svg-icons';

import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';

import { DivisionComponent } from './division/division.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';
import { GroupComponent } from './group/group.component';
import { NavigationTreeComponent } from './navigation-tree/navigation-tree.component';
import { NavigationNodeComponent } from './navigation-tree/navigation-node/navigation-node.component';
import { NavigationLeafComponent } from './navigation-tree/navigation-leaf/navigation-leaf.component';


@NgModule({
  declarations: [DivisionComponent, PageComponent, GroupComponent, NavigationTreeComponent, NavigationNodeComponent, NavigationLeafComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    FontAwesomeModule
  ],
    exports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatInputModule,
        MatListModule,
        MatTableModule,
        MatMenuModule,
        MatTooltipModule,
        FontAwesomeModule,
        DivisionComponent,
        ReactiveFormsModule,
        PageComponent,
        GroupComponent,
        NavigationTreeComponent
    ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faChevronLeft,
      faTrashAlt,
      faEdit,
      faMinusSquare,
      faPlusSquare,
      faTable,
      faPlug,
      faPlay,
      faSearch,
      faStop,
      faTools);
  }
}
