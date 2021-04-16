import {Component, Input, OnInit} from '@angular/core';
import {NavigationNode} from './navigation-tree';

@Component({
  selector: 'app-navigation-tree',
  templateUrl: './navigation-tree.component.html',
  styleUrls: ['./navigation-tree.component.scss']
})
export class NavigationTreeComponent implements OnInit {

  @Input()
  rootNodes: NavigationNode[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
