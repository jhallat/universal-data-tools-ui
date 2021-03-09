import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { ConnectionDefinition, ConnectionError, ConnectionToken, ConnectionType } from './connection';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private urlDataSource = `${environment.apiUrl}/data-sources`; 

  constructor(private http: HttpClient) { }

  getConnectionTypes(): Observable<ConnectionType[] | ConnectionError> {
    console.debug(`${this.urlDataSource}/types`);
    return this.http.get<ConnectionType[]>(`${this.urlDataSource}/types`)
    .pipe(
      catchError(err => this.handleError(err,"An error occured retreiving connection types"))
    )
  }

  getConnections(): Observable<ConnectionDefinition[] | ConnectionError> {
    return this.http.get<ConnectionDefinition[]>(`${this.urlDataSource}/connections`)
    .pipe(
      catchError(err => this.handleError(err,"An error occured retreiving connections"))
    )
  }

  addConnection(connection: ConnectionDefinition): Observable<ConnectionDefinition | ConnectionError > {
    return this.http.post<ConnectionDefinition>(`${this.urlDataSource}/connection`,
      connection)
    .pipe(
      catchError(err => this.handleError(err,"An error occured adding connection"))
    );
  }

  connect(connectionId: string): Observable<ConnectionToken | ConnectionError > {
    return this.http.get<ConnectionToken>(`${this.urlDataSource}/connect/${connectionId}`)
    .pipe(
      catchError(err => this.handleError(err,"An error occured connecting to data source"))
    )
  }

  private handleError(err: HttpErrorResponse, localMessage: string): Observable<ConnectionError> {
    let connectionError = new ConnectionError(100, err.statusText, localMessage);
    console.error(err.message);
    return throwError(connectionError);
  }


}
