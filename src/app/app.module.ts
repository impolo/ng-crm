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
import { ClarityModule } from 'clarity-angular';
import {NmcService} from "./services/nmc_service";
import {BackButtonComponent} from './components/back-button.component';

import {CrmService} from "./services/crm.service";
import { SearchLeadComponent } from './containers/search-lead.component';
import { NewLeadComponent } from './containers/new-lead.component';
import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";
import {InputMaskModule} from "primeng/components/inputmask/inputmask";
import { NotesComponent } from './containers/notes.component';
import {NewNoteComponent} from "./containers/new-note.component";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    UnavailableComponent,
    BackButtonComponent,
    SearchLeadComponent,
    NewLeadComponent,
    NotesComponent,
    NewNoteComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    ComponentsModule,
    MaterialModule,
    AutoCompleteModule,
    InputMaskModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule.forRoot(),
    RouterModule.forRoot(routes),

  ],
  providers: [NmcService, AuthGuard, CrmService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    window.localStorage.setItem('webapiurl', '')
  }

}
