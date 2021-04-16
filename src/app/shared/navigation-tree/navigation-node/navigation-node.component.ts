import {Component, Input, OnInit} from '@angular/core';
import {NavigationNode} from '../navigation-tree';

@Component({
  selector: 'app-navigation-node',
  templateUrl: './navigation-node.component.html',
  styleUrls: ['./navigation-node.component.scss']
})
export class NavigationNodeComponent implements OnInit {

  @Input()
  node: NavigationNode | undefined  = undefined;

  @Input()
  root = false;

  get caption(): string {
    if (this.node === undefined) {
      return '';
    }
    return this.node.name;
  }

  get nodes(): NavigationNode[] {
    if (this.node === undefined) {
      return [];
    }
    return this.node.nodes;
  }

  get isLeaf(): boolean {
    if (this.node === undefined) {
      return true;
    }
    return this.node.leaf;
  }

  opened = false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggle(): void {
    this.opened = !this.opened;
  }
}
