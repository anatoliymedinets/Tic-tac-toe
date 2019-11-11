import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent{

  constructor() { }

  activeTab="Games"

  changeTab(event:Event, tab: string){
    event.preventDefault()
    this.activeTab = tab
  }
}
