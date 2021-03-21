import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {DockerContainer} from './docker';

@Injectable({
  providedIn: 'root'
})
export class DockerService {

  private urlDocker = `${environment.apiUrl}/docker`;

  constructor(private http: HttpClient) { }

  getContainers(): Observable<DockerContainer[] > {
    return this.http.get<DockerContainer[] >(`${this.urlDocker}/containers`);
  }

  startContainer(containerId: string): Observable<DockerContainer> {
    return this.http.post<DockerContainer>(`${this.urlDocker}/container/start/${containerId}`, {});
  }

  stopContainer(containerId: string): Observable<DockerContainer> {
    return this.http.post<DockerContainer>(`${this.urlDocker}/container/stop/${containerId}`, {});

  }


 }
