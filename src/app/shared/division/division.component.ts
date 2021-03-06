import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  @Input()
  title = '';

  constructor() { }

  ngOnInit(): void {
  }

}
