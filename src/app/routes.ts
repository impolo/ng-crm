import {Routes} from '@angular/router';

import {NotFoundPageComponent} from './containers/not-found-page';
import {LoginComponent} from "./containers/login";
import {UnavailableComponent} from "./containers/unavailable";
import {AuthGuard} from "./guards/auth.guard";
import {SearchLeadComponent} from "./containers/search-lead.component";
import {NewLeadComponent} from "./containers/new-lead.component";
import {NotesComponent} from "./containers/notes.component";
import {NewNoteComponent} from "./containers/new-note.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'searchLeads',
    component: SearchLeadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editLead/:mode',
    component: NewLeadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editLead/:id/:mode',
    component: NewLeadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notes/:leadId',
    component: NotesComponent
  },
  {
    path: 'notes/:leadId/new',
    component: NewNoteComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }



];
