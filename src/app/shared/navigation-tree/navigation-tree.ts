export interface NavigationNode {
  name: string;
  data: any;
  leaf: boolean;
  nodes: NavigationNode[];
}
