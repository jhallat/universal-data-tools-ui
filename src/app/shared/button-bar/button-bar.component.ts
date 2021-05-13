import {Component, Input, OnInit} from '@angular/core';
import {ButtonDef} from './button-bar';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.scss']
})
export class ButtonBarComponent implements OnInit {

  @Input()
  buttons: ButtonDef[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
