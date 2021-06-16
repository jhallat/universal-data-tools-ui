import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt, faEdit, faPlusSquare, faMinusSquare , faSquare, faCheckSquare} from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faTable, faPlug, faPlay, faStop, faSearch, faTools} from '@fortawesome/free-solid-svg-icons';

import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DivisionComponent } from './division/division.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';
import { GroupComponent } from './group/group.component';
import { NavigationTreeComponent } from './navigation-tree/navigation-tree.component';
import { NavigationNodeComponent } from './navigation-tree/navigation-node/navigation-node.component';
import { NavigationLeafComponent } from './navigation-tree/navigation-leaf/navigation-leaf.component';
import { ButtonTabsComponent } from './button-tabs/button-tabs.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import {UdtcPageModule} from 'udtc-page';


@NgModule({
  declarations: [DivisionComponent,
    PageComponent,
    GroupComponent,
    NavigationTreeComponent,
    NavigationNodeComponent,
    NavigationLeafComponent,
    ButtonTabsComponent,
    ButtonBarComponent],
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
        MatSnackBarModule,
        MatTabsModule,
        MatTooltipModule,
        FontAwesomeModule,
        DivisionComponent,
        FormsModule,
        ReactiveFormsModule,
        PageComponent,
        GroupComponent,
        NavigationTreeComponent,
        ButtonTabsComponent,
        ButtonBarComponent,
        UdtcPageModule
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
      faTools,
      faSquare,
      faCheckSquare);
  }
}
