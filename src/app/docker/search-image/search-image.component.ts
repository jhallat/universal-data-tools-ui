import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchItem} from '../docker';
import {DockerService} from '../docker.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.scss']
})
export class SearchImageComponent implements OnInit {

  @Output()
  canceled: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  selected: EventEmitter<string> = new EventEmitter<string>();

  search = '';
  officialOnly = false;
  minimumRating = 0;
  searchItems: SearchItem[] = [];

  constructor(private dockerService: DockerService) { }

  ngOnInit(): void {
  }

  onSearchImage(): void {
    this.dockerService.searchImages(this.search, this.officialOnly, this.minimumRating).subscribe({
      next: data => {
        console.log(data);
        this.searchItems = data;
      }
    });
  }

  onCancel(): void {
    this.canceled.emit();
  }

  onSelect(name: string): void {
    this.selected.emit(name);
  }
}
