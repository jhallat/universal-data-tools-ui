import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private http: HttpClient,
              private router: Router) { }

  getConnectionTypes(): Observable<ConnectionType[] | ServiceError> {
    console.log(`${this.urlDataSource}/types`);
    return this.http.get<ConnectionType[]>(`${this.urlDataSource}/types`)
    .pipe(
      catchError(err => this.handleError(err))
    );
  }

  getConnections(): Observable<ConnectionDefinition[] | ServiceError> {
    return this.http.get<ConnectionDefinition[]>(`${this.urlDataSource}/connections`)
    .pipe(
      catchError(err => this.handleError(err))
    );
  }

  addConnection(connection: ConnectionDefinition): Observable<ConnectionDefinition | ServiceError > {
    console.log(connection);
    return this.http.post<ConnectionDefinition>(`${this.urlDataSource}/connection`,
      connection)
    .pipe(
      catchError(err => this.handleError(err))
    );
  }

  connect(connectionId: string): Observable<ConnectionToken | ServiceError > {
    return this.http.get<ConnectionToken>(`${this.urlDataSource}/connect/${connectionId}`)
    .pipe(
      tap(data => window.localStorage.setItem('connection-token', data.token)),
      catchError(err => this.handleError(err))
    );
  }

  disconnect(): void {
    console.log('Disconnecting');
    const connectionToken = window.localStorage.getItem('connection-token');
    this.http.put<void>(`${this.urlDataSource}/disconnect/${connectionToken}`, {})
      .subscribe().unsubscribe();
    window.localStorage.setItem('connection-token', '');
    this.router.navigate(['/connection']);
  }

  private handleError(err: HttpErrorResponse): Observable<ServiceError> {
    const connectionError = new ServiceError(100, err.statusText, err.message);
    console.error(err.message);
    window.localStorage.setItem('connection-token', '');
    return throwError(connectionError);
  }


}
