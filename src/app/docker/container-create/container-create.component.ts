import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreateContainerDef, DockerImage} from '../docker';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {getImages, State} from '../state/docker.reducer';
import * as DockerAction from '../state/docker.actions';
import {Router} from '@angular/router';
import * as DockerActions from '../state/docker.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-container-create',
  templateUrl: './container-create.component.html',
  styleUrls: ['./container-create.component.scss']
})
export class ContainerCreateComponent implements OnInit, OnDestroy {

  newContainerForm!: FormGroup;
  images: DockerImage[] = [];
  images$!: Subscription;

  get ports(): FormArray{
    return this.newContainerForm.get('ports') as FormArray;
  }

  get volumes(): FormArray {
    return this.newContainerForm.get('volumes') as FormArray;
  }

  get environmentVariables(): FormArray {
    return this.newContainerForm.get('environmentVariables') as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(DockerActions.loadImages());
    this.images$ = this.store.select(getImages).subscribe({
      next: data => {
        this.images = data;
      }
    });
    this.newContainerForm = this.formBuilder.group({
        image: '',
        name: '',
        ports: this.formBuilder.array([this.buildPortField(0, 0)]),
        volumes: this.formBuilder.array([this.buildVolumeField('', '')]),
        environmentVariables: this.formBuilder.array([this.buildEnvironmentVariableField('', '')])
    });
  }

  ngOnDestroy(): void {
    this.images$.unsubscribe();
  }

  addPortField(): void {
    const propertyArray = this.newContainerForm.get('ports') as FormArray;
    propertyArray.push(this.buildPortField(0, 0));
  }

  addVolumeField(): void {
    const propertyArray = this.newContainerForm.get('volumes') as FormArray;
    propertyArray.push(this.buildVolumeField('', ''));
  }

  addEnvironmentVariableField(): void {
    const propertyArray = this.newContainerForm.get('environmentVariables') as FormArray;
    propertyArray.push(this.buildEnvironmentVariableField('', ''));
  }

  buildPortField(privatePort: number, publicPort: number): FormGroup {
    return this.formBuilder.group({
      privatePort,
      publicPort
    });
  }

  buildVolumeField(source: string, target: string): FormGroup {
    return this.formBuilder.group({
      source,
      target
    });
  }

  buildEnvironmentVariableField(name: string, value: string): FormGroup {
    return this.formBuilder.group({
      name,
      value
    });
  }

  onClickAddPort(): void {
    this.addPortField();
  }

  onClickAddVolume(): void {
    this.addVolumeField();
  }

  onClickAddEnvironmentVariable(): void {
    this.addEnvironmentVariableField();
  }

  onClickCreateContainer(): void {
    const definition = new CreateContainerDef();
    definition.image = this.newContainerForm.get('image')?.value + '';
    console.log(`image name = ${this.newContainerForm.get('image')?.value + ''}`);
    definition.name = this.newContainerForm.get('name')?.value + '';
    for (const port of this.ports.controls) {
      const privatePort = port.get('privatePort') !== null ? port.get('privatePort')?.value : 0;
      const publicPort = port.get('publicPort') !== null ? port.get('publicPort')?.value : 0;
      definition.publishedPorts.push({ privatePort, publicPort});
    }
    for (const volume of this.volumes.controls) {
      const source = volume.get('source') !== null ? volume.get('source')?.value : '';
      const target = volume.get('target') !== null ? volume.get('target')?.value : '';
      definition.volumes.push({ source, target});
    }
    for (const variable of this.environmentVariables.controls) {
      const name = variable.get('name') !== null ? variable.get('name')?.value : '';
      const value = variable.get('value') !== null ? variable.get('value')?.value : '';
      console.log(`variable = ${name}:${value}`);
      definition.environmentVariables.push({ name, value});
    }
    console.log(definition);
    this.store.dispatch(DockerAction.createContainer({definition}));
    this.router.navigate(['containers']);
  }

  onClickCancel(): void {
    this.router.navigate(['containers']);
  }
}
