import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Data, DataError } from "./data";
import { DataService } from "./data.service";

@Injectable({
    providedIn: 'root'
})
export class DataItemResolver implements Resolve<Data | DataError> {
    
    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Data | DataError> {
        const tableName = route.paramMap.get('tableName') + '';
        const params = route.queryParams
        return this.dataService.getItem(tableName, params)
            .pipe(
                catchError(err => of(err))
            );

    }
    
}