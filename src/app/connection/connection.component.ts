import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from '../state/app.state';
import { ConnectionDefinition, ConnectionType } from './connection';
import { getConnections, getConnectionToken, getConnectionTypes } from './state/connection.reducer';
import * as ConnectionActions from './state/connection.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit, OnDestroy {

  createConnection = false;
  connections$!: Subscription;
  connectionTypes$!: Subscription;
  connect$!: Subscription;
  connections!: ConnectionDefinition[]; 
  connectionTypes!: ConnectionType[];
  newConnectionForm!: FormGroup;
  connectionForm!: FormGroup;

  constructor(private store: Store<State>,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.newConnectionForm = this.formBuilder.group({
      connectionType: ['', Validators.required],
      description: [''],
      url: ['', Validators.required]
    })

    this.connectionForm = this.formBuilder.group({
      connection: ['', Validators.required]
    })

    this.store.dispatch(ConnectionActions.loadConnectionTypes());
    this.store.dispatch(ConnectionActions.loadConnections());
    this.connections$ = this.store.select(getConnections).subscribe({
      next: data => {
        this.connections = data;
        this.createConnection = this.connections === null || this.connections.length === 0;
      }
    })
    this.connectionTypes$ = this.store.select(getConnectionTypes).subscribe({
      next: data => {
        this.connectionTypes = data;
      }
    })
    this.connect$ = this.store.select(getConnectionToken).subscribe({
      next: data => {
        if (data.valid) {
          this.router.navigate(["navigation"]);
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.connections$.unsubscribe;
    this.connectionTypes$.unsubscribe;
    this.connect$.unsubscribe;
  }

  connect(): void {
    this.store.dispatch(ConnectionActions.connect( { connectionId: this.connectionForm.get("connection")?.value} ));
  }

  cancel(): void {
    this.createConnection = false;
  }

  displayNewConnection(): void {
    this.createConnection = true;
  }

  createNewConnection(): void {
    if (this.newConnectionForm.valid) {
      const connection = {
        id: 0,
        typeId: this.newConnectionForm.get("connectionType")?.value,
        description: this.newConnectionForm.get("description")?.value,
        url: this.newConnectionForm.get("url")?.value
      }
      this.store.dispatch(ConnectionActions.addConnection( { connection }));
      this.createConnection = false;
    }
  }
}
