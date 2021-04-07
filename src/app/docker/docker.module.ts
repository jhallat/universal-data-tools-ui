import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockerContainerComponent } from './docker-container/docker-container.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { dockerReducer } from './state/docker.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DockerEffects } from './state/docker.effects';
import {DockerPageComponent} from './docker-page/docker-page.component';
import {ContainerCreateComponent} from './container-create/container-create.component';
import {FormsModule} from '@angular/forms';
import {SearchImageComponent} from './search-image/search-image.component';



@NgModule({
  declarations: [
    DockerContainerComponent,
    DockerPageComponent,
    ContainerCreateComponent,
    SearchImageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('docker', dockerReducer),
    EffectsModule.forFeature([DockerEffects]),
    RouterModule.forChild([
      {
        path: 'docker',
        component: DockerPageComponent,
        children: [
          {path: '', redirectTo: 'containers', pathMatch: 'full'},
          {path: 'containers', component: DockerContainerComponent},
          {path: 'create-container', component: ContainerCreateComponent}
        ]
      }
    ]),
    SharedModule,
    FormsModule
  ]
})
export class DockerModule { }
