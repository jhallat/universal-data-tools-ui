import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ButtonDef} from '../../shared/button-bar/button-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from '../state/database.reducer';
import {createDatabase} from '../state/database.actions';

@Component({
  selector: 'app-create-database',
  templateUrl: './create-database.component.html',
  styleUrls: ['./create-database.component.scss']
})
export class CreateDatabaseComponent implements OnInit {

  name = '';
  buttons: ButtonDef[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<State>,
              private location: Location) { }

  ngOnInit(): void {
    this.buttons.push({caption: 'Create', action: this.onCreate});
    this.buttons.push({caption: 'Cancel', action: this.onCancel});
  }

  onCancel = (): void => {
    this.location.back();
  }

  onCreate = (): void => {
    console.log('Database name : ' + this.name);
    this.store.dispatch(createDatabase({database: {name: this.name, owner: ''}}));
    this.location.back();
  }
}
