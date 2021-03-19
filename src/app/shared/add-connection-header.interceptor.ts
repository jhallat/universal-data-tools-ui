import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConnectionToken } from '../connection/connection';
import { getConnectionToken } from '../connection/state';
import { State } from '../state/app.state';

@Injectable()
export class AddConnectionHeaderInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = window.localStorage.getItem('connection-token');
        if (token != null) {
            const tokenRequest: HttpRequest<any> = req.clone({
                setHeaders: { 'connection-token': token }
            });
            return next.handle(tokenRequest);
        }
        return next.handle(req);

    }

}
