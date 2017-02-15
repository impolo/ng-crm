import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpModule, JsonpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';

import {AppComponent} from './containers/app.component';
import {ComponentsModule} from './components';
import {routes} from './routes';
import {RouterModule} from "@angular/router";
import {NotFoundPageComponent} from "./containers/not-found-page";
import {UnavailableComponent} from "./containers/unavailable";
import {AuthGuard} from "./guards/auth.guard";
import {ClarityModule} from "clarity-angular";
import {NmcService} from "./services/nmc_service";
import {BackButtonComponent} from './components/back-button.component';
import {AddressComponent} from './components/address.component';

import {AutoCompleteModule} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {CrmService} from "./services/crm.service";
import { SearchLeadComponent } from './containers/search-lead.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    UnavailableComponent,
    BackButtonComponent,
    AddressComponent,
    SearchLeadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    ComponentsModule,
    MaterialModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    RouterModule.forRoot(routes),
    AutoCompleteModule,
    InputMaskModule
  ],
  providers: [NmcService, AuthGuard, CrmService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    window.localStorage.setItem('webapiurl', '')
  }

}
