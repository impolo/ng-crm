import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'aio-not-found-page',
  styleUrls: ['../css/cards.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>404: Not Found</md-card-title>
      <md-card-content>
        <p>Hey! It looks like this page doesn't exist yet.</p>
      </md-card-content>
      <md-card-content>
        <button md-raised-button color="primary" routerLink="/">Take Me Home</button>
      </md-card-content>
    </md-card>
  `
})
export class NotFoundPageComponent { }
