import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
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
import { environment } from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {LogModule} from './log/log.module';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {statusRxStompConfig} from './status-message';


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
    DataModule,
    LogModule,
    AppRoutingModule,
    FontAwesomeModule,
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddConnectionHeaderInterceptor, multi: true},
    {
      provide: InjectableRxStompConfig,
      useValue: statusRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faDatabase);
  }
}

