export interface DockerContainer {
    containerId: string;
    image: string;
    command: string;
    created: string;
    status: string;
    ports: string;
    names: string;
}

export interface SearchItem {
  name: string;
  description: string;
  stars: number;
  official: boolean;
}

export interface PublishedPort {
  privatePort: string;
  publicPort: string;
}

export class CreateContainerDef {
  image = '';
  name = '';
  publishedPorts: PublishedPort[] = [];
}
