import {Routes} from '@angular/router';

import {NotFoundPageComponent} from './containers/not-found-page';
import {LoginComponent} from "./containers/login";
import {UnavailableComponent} from "./containers/unavailable";
import {AuthGuard} from "./guards/auth.guard";
import {SearchLeadComponent} from "./containers/search-lead.component";

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
    path: '**',
    component: NotFoundPageComponent
  }


];
