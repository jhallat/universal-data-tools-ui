import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchItem} from '../docker';
import {DockerService} from '../docker.service';
import {Subject} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.scss']
})
export class SearchImageComponent implements OnInit {

  search = '';
  officialOnly = false;
  minimumRating = 0;
  searchItems: SearchItem[] = [];
  tags: string[] = [];
  subject = new Subject<string>();
  selectedImage = '';
  selectedTag = '';

  constructor(private dockerService: DockerService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subject.pipe(
      debounceTime(1000),
      map((image: string) => this.dockerService.getTags(image))
    ).subscribe(data => data.subscribe(tagData => this.tags = tagData));;
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
    this.router.navigate(['containers'], {relativeTo: this.route});
  }

  onSelect(name: string): void {
    this.selectedImage = name;
    this.dockerService.getTags(name).subscribe({
      next: data => this.tags = data
      });
  }

  onEnterImage(): void {
    this.subject.next(this.selectedImage);
  }

  onPullImage(): void {
    if (this.selectedImage.trim() !== '' && this.selectedTag.trim() !== '') {
      console.log(`${this.selectedImage}:${this.selectedTag}`);
      this.dockerService.pullImage(this.selectedImage, this.selectedTag);
      this.router.navigate(['containers'], {relativeTo: this.route});
    } else {
      console.log('Missing parameters');
    }
  }
}
