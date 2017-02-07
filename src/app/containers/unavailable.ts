import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'aio-unavailable',
  styleUrls: ['../css/cards.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>Service temporally unavailable</md-card-title>
      <md-card-content>
        <p>Hey! Please check our service later</p>
      </md-card-content>
    </md-card>
  `
})
export class UnavailableComponent { }
