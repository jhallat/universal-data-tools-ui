export abstract class NavigationNode {
  name: string;
  abstract get isLeaf(): boolean;

  protected constructor(name: string) {
    this.name = name;
  }

}

export class BranchNode extends NavigationNode {

  nodes: NavigationNode[] = [];

  constructor(name: string) {
    super(name);
  }

  get isLeaf(): boolean {
    return false;
  }

}

export class LeafNode<Type> extends NavigationNode {

  data: Type | undefined;

  constructor(name: string) {
    super(name);
  }

  get isLeaf(): boolean {
    return true;
  }

}

export class NavigationTreeBuilder<Type> {

  private nodes: NavigationNode[] = [];
  private currentNode: BranchNode | undefined;
  private nodeStack: BranchNode[] = [];
  private currentLeaf: LeafNode<Type> | undefined;

  forRoot(name: string): NavigationTreeBuilder<Type> {
    this.currentNode = new BranchNode(name);
    this.nodeStack = [this.currentNode];
    this.nodes.push(this.currentNode);
    return this;
  }

  addNode(name: string): NavigationTreeBuilder<Type> {
    this.currentNode = new BranchNode(name);
    if (this.nodeStack.length > 0) {
      this.nodeStack[0].nodes.push(this.currentNode);
    }
    return this;
  }

  beginChildNodes(): NavigationTreeBuilder<Type> {
    if (this.currentNode !== undefined) {
      this.nodeStack.unshift(this.currentNode);
    }
    return this;
  }

  endChildNodes(): NavigationTreeBuilder<Type> {
    if (this.nodeStack.length > 1) {
      this.nodeStack.shift();
    }
    return this;
  }

  addLeaf(name: string): NavigationTreeBuilder<Type> {
    this.currentLeaf = new LeafNode<Type>(name);
    this.currentNode?.nodes.push(this.currentLeaf);
    return this;
  }

  withData(data: Type): NavigationTreeBuilder<Type> {
    if (this.currentLeaf !== undefined) {
      this.currentLeaf.data = data;
    }
    return this;
  }

  create(): NavigationNode[] {
    return this.nodes;
  }

}
