import {Component, Input, OnInit} from '@angular/core';
import {NavigationNode} from '../navigation-tree';

@Component({
  selector: 'app-navigation-leaf',
  templateUrl: './navigation-leaf.component.html',
  styleUrls: ['./navigation-leaf.component.scss']
})
export class NavigationLeafComponent implements OnInit {

  @Input()
  node: NavigationNode | undefined  = undefined;

  @Input()
  last = false;

  get caption(): string {
    if (this.node === undefined) {
      return '';
    }
    return this.node.name;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
