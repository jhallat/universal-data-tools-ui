import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Menu, MenuItem} from './menu';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input()
  title = '';

  @Input()
  menus: Menu[] | undefined;

  @Output()
  menuClicked = new EventEmitter<MenuItem>();

  constructor() { }

  ngOnInit(): void {
  }

}
