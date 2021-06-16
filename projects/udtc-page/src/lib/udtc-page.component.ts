import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Menu, MenuItem} from './menu';

@Component({
  selector: 'lib-udtc-page',
  template: `
    <div class='page-header'>
      <div class="page-title">{{ title }}</div>
      <div *ngIf="menus">
        <ng-container *ngFor="let menu of menus">
          <button mat-button [matMenuTriggerFor]="pageMenu">{{menu.caption}}</button>
          <mat-menu #pageMenu="matMenu">
            <ng-container *ngFor="let item of menu.items">
              <button mat-menu-item (click)="item.action()">
                {{item.caption}}
              </button>
            </ng-container>
          </mat-menu>
        </ng-container>
      </div>
      <div class="error-message">
        {{errorMessage}}
      </div>
    </div>
    <div class='page-contents'>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      font-size: 1rem;
    }

    .page-header {
      background-color: #eab56b;
      padding: 10px;
      padding-left: 20px;
      font-size: 1.25rem;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .page-contents {
      position: absolute;
      bottom: 60px;
      top: 150px;
      left: 30px;
      right: 30px;
      box-sizing: border-box;
      display: block;

    }

    .page-title {
      display: block;
      height: 20px;
      margin-right: 15px;
    }

    button {
      padding-top: 4px;
    }
  `
  ]
})
export class UdtcPageComponent implements OnInit {

  @Input()
  title = '';

  @Input()
  menus: Menu[] | undefined;

  @Input()
  errorMessage = '';

  @Output()
  menuClicked = new EventEmitter<MenuItem>();

  constructor() { }

  ngOnInit(): void {
  }

}
