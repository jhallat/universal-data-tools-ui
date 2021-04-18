import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationNode} from './navigation-tree';

@Component({
  selector: 'app-navigation-tree',
  templateUrl: './navigation-tree.component.html',
  styleUrls: ['./navigation-tree.component.scss']
})
export class NavigationTreeComponent implements OnInit {

  @Input()
  rootNodes: NavigationNode[] = [];

  @Output()
  selected = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(data: any) {
    this.selected.emit(data);
  }
}
