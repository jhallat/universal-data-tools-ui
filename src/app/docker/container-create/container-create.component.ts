import { Component, OnInit } from '@angular/core';
import {CreateContainerDef} from '../docker';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {State} from '../state/docker.reducer';
import * as DockerAction from '../state/docker.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-container-create',
  templateUrl: './container-create.component.html',
  styleUrls: ['./container-create.component.scss']
})
export class ContainerCreateComponent implements OnInit {

  newContainerForm!: FormGroup;
  displaySearchDialog = false;

  get ports(): FormArray{
    return this.newContainerForm.get('ports') as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<State>) { }

  ngOnInit(): void {
    this.newContainerForm = this.formBuilder.group({
        image: '',
        name: '',
        ports: this.formBuilder.array([this.buildPortField(0, 0)])
    });
  }

  addPortField(): void {
    const propertyArray = this.newContainerForm.get('ports') as FormArray;
    propertyArray.push(this.buildPortField(0, 0));
  }

  buildPortField(privatePort: number, publicPort: number): FormGroup {
    return this.formBuilder.group({
      privatePort,
      publicPort
    });
  }

  onSearchImageDisplay(): void {
    this.displaySearchDialog = true;
  }

  onSearchImageCanceled(): void {
    this.displaySearchDialog = false;
  }

  onSelectSearchImage(name: string): void {
    this.newContainerForm.get('image')?.setValue(name);
    this.displaySearchDialog = false;
  }

  onClickAddPort(): void {
    this.addPortField();
  }

  onClickCreateContainer(): void {
    const definition = new CreateContainerDef();
    definition.image = this.newContainerForm.get('image')?.value + '';
    definition.name = this.newContainerForm.get('name')?.value + '';
    for (const port of this.ports.controls) {
      const privatePort = port.get('privatePort') !== null ? port.get('privatePort')?.value : 0;
      const publicPort = port.get('publicPort') !== null ? port.get('publicPort')?.value : 0;
      definition.publishedPorts.push({ privatePort, publicPort});
    }
    this.store.dispatch(DockerAction.createContainer({definition}));
    this.router.navigate(['containers']);
  }

  onClickCancel(): void {
    this.router.navigate(['containers']);
  }
}
