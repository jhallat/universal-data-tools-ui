import { Injectable } from '@angular/core';
import {StatusMessage} from './status-message';
import {Observable} from 'rxjs';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {webSocket} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class StatusMessageService {

  constructor() {

  }

  public connect(): Observable<StatusMessage>{
    const statusMessageWebSocket: WebSocketSubject<StatusMessage>
      = webSocket('ws://localhost:8080/topic/status');
    return statusMessageWebSocket.asObservable();
  }

}
