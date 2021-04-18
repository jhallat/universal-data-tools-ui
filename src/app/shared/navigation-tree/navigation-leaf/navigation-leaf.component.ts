import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LeafNode, NavigationNode} from '../navigation-tree';

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

  @Output()
  selected = new EventEmitter<any>();

  get caption(): string {
    if (this.node === undefined) {
      return '';
    }
    return this.node.name;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    if (this.node?.isLeaf) {
      const leaf = this.node as LeafNode<any>;
      this.selected.emit(leaf.data);
    }
  }
}
