import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TableModule } from './table/table.module';
import { EffectsModule } from '@ngrx/effects';
import { DataModule } from './data/data.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

import { ConnectionModule } from './connection/connection.module';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { DockerModule } from './docker/docker.module';
import { SharedModule } from './shared/shared.module';
import { AddConnectionHeaderInterceptor } from './shared/add-connection-header.interceptor';
import { DatabaseModule } from './database/database.module';
import {errorReducer} from './state/app.reducer';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({router: routerReducer, error: errorReducer}),
    EffectsModule.forRoot([]),
    ConnectionModule,
    DockerModule,
    DatabaseModule,
    TableModule,
    DataModule,
    AppRoutingModule,
    FontAwesomeModule,
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddConnectionHeaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faDatabase);
  }
}

