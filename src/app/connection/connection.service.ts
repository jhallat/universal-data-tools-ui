import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { ConnectionDefinition, ConnectionToken, ConnectionType } from './connection';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private urlDataSource = `${environment.apiUrl}/data-sources`;

  constructor(private http: HttpClient,
              private router: Router) { }

  getConnectionTypes(): Observable<ConnectionType[]> {
    return this.http.get<ConnectionType[]>(`${this.urlDataSource}/types`);
  }

  getConnections(): Observable<ConnectionDefinition[]> {
    return this.http.get<ConnectionDefinition[]>(`${this.urlDataSource}/connections`);
  }

  addConnection(connection: ConnectionDefinition): Observable<ConnectionDefinition> {
    return this.http.post<ConnectionDefinition>(`${this.urlDataSource}/connection`,
      connection);
  }

  connect(connectionId: string): Observable<ConnectionToken> {
    return this.http.get<ConnectionToken>(`${this.urlDataSource}/connect/${connectionId}`).pipe(
      tap(data => {
        window.localStorage.setItem('connection-token', data.token);
        window.localStorage.setItem('connection-description', data.description);
        window.localStorage.setItem('connection-type', data.type);
      })
    );
  }

  disconnect(): void {
    console.log('Disconnecting');
    const connectionToken = window.localStorage.getItem('connection-token');
    this.http.put<void>(`${this.urlDataSource}/disconnect/${connectionToken}`, {})
      .subscribe().unsubscribe();
    window.localStorage.setItem('connection-token', '');
    window.localStorage.setItem('connection-description', '');
    window.localStorage.setItem('connection-type', '');
    this.router.navigate(['/connection']);
  }


}
