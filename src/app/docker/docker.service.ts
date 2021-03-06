import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {CreateContainerDef, DockerContainer, DockerImage, SearchItem} from './docker';

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

  createContainer(definition: CreateContainerDef): Observable<DockerContainer> {
    return this.http.post<DockerContainer>(`${this.urlDocker}/container/create`, definition);
  }

  deleteContainer(containerId: string): Observable<any> {
    return this.http.delete(`${this.urlDocker}/container/${containerId}`);
  }

  searchImages(search: string, officialOnly?: boolean, minimumRating?: number): Observable<SearchItem[]> {
    const params = new HttpParams();
    if (officialOnly) {
      params.set('officialOnly', String(officialOnly));
    }
    if (minimumRating) {
      params.set('minimumRating', String(minimumRating));
    }
    return this.http.get<SearchItem[]>(`${this.urlDocker}/images/search/${search}`, {params});
  }

  getImages(): Observable<DockerImage[]> {
    return this.http.get<DockerImage[]>(`${this.urlDocker}/images/pulled`);
  }

  getTags(image: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlDocker}/image/${image}/tags`);
  }

  pullImage(image: string, tag: string): void {
    this.http.put<void>(`${this.urlDocker}/image/pull/${image}/${tag}`, {}).subscribe();
  }

 }
