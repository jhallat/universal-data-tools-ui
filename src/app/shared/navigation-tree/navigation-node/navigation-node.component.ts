import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BranchNode, NavigationNode} from '../navigation-tree';

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

  @Output()
  selected = new EventEmitter<any>();

  get caption(): string {
    if (this.node === undefined) {
      return '';
    }
    return this.node.name;
  }

  get nodes(): NavigationNode[] {
    if (this.node === undefined || this.node.isLeaf) {
      return [];
    }
    const branch = this.node as BranchNode;
    return branch.nodes;
  }

  get isLeaf(): boolean {
    if (this.node === undefined) {
      return true;
    }
    return this.node.isLeaf;
  }

  opened = false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggle(): void {
    this.opened = !this.opened;
  }

  onSelected(data: any): void {
    this.selected.emit(data);
  }
}
