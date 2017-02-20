import {Routes} from '@angular/router';

import {NotFoundPageComponent} from './containers/not-found-page';
import {LoginComponent} from "./containers/login";
import {UnavailableComponent} from "./containers/unavailable";
import {AuthGuard} from "./guards/auth.guard";
import {SearchLeadComponent} from "./containers/search-lead.component";
import {NewLeadComponent} from "./containers/new-lead.component";

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
    path: 'newLead',
    component: NewLeadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editLead/:id',
    component: NewLeadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }


];
