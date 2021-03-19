import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from '../../state/app.state';
import { Data } from '../data';
import { getData } from '../state/data.reducer';
import * as DataActions from '../state/data.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy {
  data$!: Subscription ;
  data!: Data;
  tableName!: string | null;

  constructor(private store: Store<State>,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.data$ = this.store.select(getData).subscribe({
      next: data => {
        this.data = data;
        if (data.headings.length === 0) {
          this.router.navigate(['select-table']);
        }
      }
    });
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.tableName = params.get('tableName');
        if (this.tableName) {
          this.store.dispatch(DataActions.loadData({ tableName: this.tableName }));
        } else {
          this.router.navigate(['select-table']);
        }

      }
    );
  }

  ngOnDestroy(): void {
    this.data$.unsubscribe();
  }

  onEditClicked(index: number): void {
    const editItem = this.data.items[index];
    const queryParams: any = {};
    for (const heading of this.data.headings) {
      if (heading.type !== 'A') {
        queryParams[heading.name] = editItem[heading.name];
      }
    }
    this.router.navigate(['/data/edit/', this.tableName], { queryParams });
  }

}
