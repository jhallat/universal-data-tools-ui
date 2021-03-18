import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServiceError } from '../shared';
import { DockerContainer } from './docker';

@Injectable({
  providedIn: 'root'
})
export class DockerService {

  private urlDocker = `${environment.apiUrl}/docker`; 

  constructor(private http: HttpClient) { }

  getContainers(): Observable<DockerContainer[] | ServiceError> {
    return this.http.get<DockerContainer[]>(`${this.urlDocker}/containers`)
    .pipe(
      catchError(err => this.handleError(err, "An error occured retrieving docker containers"))
    )
  }

  startContainer(containerId: string): Observable<DockerContainer | ServiceError> {
    return this.http.post<DockerContainer>(`${this.urlDocker}/container/start/${containerId}`, {})
    .pipe(
      catchError(err => this.handleError(err, "An error occured starting docker container"))
    )
  }

  stopContainer(containerId: string): Observable<DockerContainer | ServiceError> {
    return this.http.post<DockerContainer>(`${this.urlDocker}/container/stop/${containerId}`, {})
    .pipe(
      catchError(err => this.handleError(err, "An error occured stopping docker container"))
    )
  }

  private handleError(err: HttpErrorResponse, localMessage: string): Observable<ServiceError> {
    let connectionError = new ServiceError(100, err.statusText, localMessage);
    console.error(err.message);
    return throwError(connectionError);
  }
}
