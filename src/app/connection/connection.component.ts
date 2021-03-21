import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from '../state/app.state';
import {ConnectionDefinition, ConnectionType, NO_CONNECION, Property, PropertyDefinition} from './connection';
import { getConnections, getConnectionToken, getConnectionTypes } from './state';
import * as ConnectionActions from './state/connection.actions';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selectedType = 0;
  connectionError = '';

  constructor(private store: Store<State>,
              private formBuilder: FormBuilder,
              private router: Router) { }

  get propertyFormArray(): FormArray {
    return this.newConnectionForm.get('properties') as FormArray;
  }

  ngOnInit(): void {
    this.newConnectionForm = this.formBuilder.group({
      connectionType: ['', Validators.required],
      description: [''],
      properties: this.formBuilder.array([])
    });

    this.connectionForm = this.formBuilder.group({
      connection: ['', Validators.required]
    });

    this.store.dispatch(ConnectionActions.loadConnectionTypes());
    this.store.dispatch(ConnectionActions.loadConnections());
    this.connections$ = this.store.select(getConnections).subscribe({
      next: data => {
        console.log(data);
        this.connections = data;
        this.createConnection = this.connections === null || this.connections.length === 0;
      }
    });
    this.connectionTypes$ = this.store.select(getConnectionTypes).subscribe({
      next: data => {
        this.connectionTypes = data;
      }
    });
    this.connect$ = this.store.select(getConnectionToken).subscribe({
      next: data => {
        console.log(`Page requested: ${data.page}`);
        if (data.valid) {
          this.router.navigate([`/${data.page}`]);
        } else {
          this.connectionError = data.description;
        }
      }
    });
    this.onSelectType();
  }

  ngOnDestroy(): void {
    this.connections$.unsubscribe();
    this.connectionTypes$.unsubscribe();
    this.connect$.unsubscribe();
  }

  onSelectType(): void {
    this.newConnectionForm.get('connectionType')?.valueChanges.subscribe(value => {
      this.propertyFormArray.clear();
      const connectionType = this.connectionTypes.find(item => item.label === value);
      if (connectionType?.propertyDefinitions) {
        for (const property of connectionType?.propertyDefinitions) {
          this.propertyFormArray.push(this.buildProperty(property, ''));
        }
      }
      console.log(connectionType);
    });
  }

  buildProperty(propertyDefinition: PropertyDefinition, value: string): FormGroup {
    if (propertyDefinition.required) {
      return this.formBuilder.group({
        propertyId: [propertyDefinition.propertyId],
        property: [propertyDefinition.description],
        masked: [propertyDefinition.masked],
        value: [value, Validators.required]
      });
    }
    return this.formBuilder.group({
      propertyId: [propertyDefinition.propertyId],
      property: [propertyDefinition.description],
      masked: [propertyDefinition.masked],
      value
    });
  }

  connect(): void {
    this.store.dispatch(ConnectionActions.connect({ connectionId: this.connectionForm.get('connection')?.value }));
  }

  cancel(): void {
    this.createConnection = false;
  }

  displayNewConnection(): void {
    this.createConnection = true;
  }

  createNewConnection(): void {
    if (this.newConnectionForm.valid) {
      const properties: Property[] = [];
      for (const propertyControl of this.propertyFormArray.controls) {
        const property = {
          propertyId: propertyControl.get('propertyId')?.value,
          value: propertyControl.get('value')?.value
        };
        properties.push(property);
      }

      const connection: ConnectionDefinition = {
        id: 0,
        typeLabel: this.newConnectionForm.get('connectionType')?.value,
        description: this.newConnectionForm.get('description')?.value,
        properties
      };
      this.store.dispatch(ConnectionActions.addConnection({ connection }));
      this.createConnection = false;
    }
  }
}
