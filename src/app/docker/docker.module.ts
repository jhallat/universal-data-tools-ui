import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockerContainerComponent } from './docker-container/docker-container.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { dockerReducer } from './state/docker.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DockerEffects } from './state/docker.effects';



@NgModule({
  declarations: [DockerContainerComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('docker', dockerReducer),
    EffectsModule.forFeature([DockerEffects]),
    RouterModule.forChild([
      {path: 'docker', component: DockerContainerComponent }
    ]),
    SharedModule
  ]
})
export class DockerModule { }
