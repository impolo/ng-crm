import {Routes} from '@angular/router';

import {NotFoundPageComponent} from './containers/not-found-page';
import {LoginComponent} from "./containers/login";
import {UnavailableComponent} from "./containers/unavailable";
import {NmcStoreInfoComponent} from "./containers/store-info";
import {AuthGuard} from "./guards/auth.guard";
import {ContactInfoComponent} from "./containers/contact-info.component";
import {StoreDetailsComponent} from "./containers/store-details.component";
import {PurchasingComponent} from "./containers/purchasing.component";
import {BillingAdrComponent} from "./containers/billing-adr.component";
import {ConfirmComponent} from "./containers/confirm.component";
import {ShipAdrComponent} from "./containers/ship-adr.component";
import {OkComponent} from "./containers/ok.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'storeInfo',
    component: NmcStoreInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'unavailable',
    component: UnavailableComponent
  },
  {
    path: 'contactInfo',
    component: ContactInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'storeDetails',
    component: StoreDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'purchasing',
    component: PurchasingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'billingAdr',
    component: BillingAdrComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shipAdr',
    component: ShipAdrComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ok',
    component: OkComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }


];
