import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceError } from '../shared';
import { environment } from './../../environments/environment';
import { ConnectionDefinition, ConnectionToken, ConnectionType } from './connection';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private urlDataSource = `${environment.apiUrl}/data-sources`; 

  constructor(private http: HttpClient) { }

  getConnectionTypes(): Observable<ConnectionType[] | ServiceError> {
    console.debug(`${this.urlDataSource}/types`);
    return this.http.get<ConnectionType[]>(`${this.urlDataSource}/types`)
    .pipe(
      catchError(err => this.handleError(err,"An error occured retreiving connection types"))
    )
  }

  getConnections(): Observable<ConnectionDefinition[] | ServiceError> {
    return this.http.get<ConnectionDefinition[]>(`${this.urlDataSource}/connections`)
    .pipe(
      catchError(err => this.handleError(err,"An error occured retreiving connections"))
    )
  }

  addConnection(connection: ConnectionDefinition): Observable<ConnectionDefinition | ServiceError > {
    console.log(connection);
    return this.http.post<ConnectionDefinition>(`${this.urlDataSource}/connection`,
      connection)
    .pipe(
      catchError(err => this.handleError(err,"An error occured adding connection"))
    );
  }

  connect(connectionId: string): Observable<ConnectionToken | ServiceError > {
    return this.http.get<ConnectionToken>(`${this.urlDataSource}/connect/${connectionId}`)
    .pipe(
      tap(data => window.localStorage.setItem("connection-token", data.token)),
      catchError(err => this.handleError(err,"An error occured connecting to data source"))
    )
  }

  private handleError(err: HttpErrorResponse, localMessage: string): Observable<ServiceError> {
    let connectionError = new ServiceError(100, err.statusText, localMessage);
    console.error(err.message);
    window.localStorage.setItem("connection-token", "");
    return throwError(connectionError);
  }


}
