import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button-tabs',
  templateUrl: './button-tabs.component.html',
  styleUrls: ['./button-tabs.component.scss']
})
export class ButtonTabsComponent implements OnInit {

  @Input()
  tabs: string[] = [];
  selectedTab = '';

  @Output()
  tabSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    if (this.tabs.length > 0) {
      this.selectedTab = this.tabs[0];
    }
  }

  onSelectTab(tab: string): void {
    this.selectedTab = tab;
    console.log(this.selectedTab);
    this.tabSelected.emit(tab);
  }

}
