import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpModule, JsonpModule} from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './containers/app.component';
import { ComponentsModule } from './components';
import { routes } from './routes';
import {RouterModule} from "@angular/router";
import {NotFoundPageComponent} from "./containers/not-found-page";
import {UnavailableComponent} from "./containers/unavailable";
import {NmcStoreInfoComponent} from "./containers/store-info";
import {AuthGuard} from "./guards/auth.guard";
import {ClarityModule} from "clarity-angular";
import { ContactInfoComponent } from './containers/contact-info.component';
import {NmcService} from "./services/nmc_service";
import { StoreDetailsComponent } from './containers/store-details.component';
import { PurchasingComponent } from './containers/purchasing.component';
import { BillingAdrComponent } from './containers/billing-adr.component';
import { ShipAdrComponent } from './containers/ship-adr.component';
import { ConfirmComponent } from './containers/confirm.component';
import { BackButtonComponent } from './components/back-button.component';
import { AddressComponent } from './components/address.component';
import { OkComponent } from './containers/ok.component';

import {AutoCompleteModule} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {CrmService} from "./services/crm.service";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    UnavailableComponent,
    NmcStoreInfoComponent,
    ContactInfoComponent,
    StoreDetailsComponent,
    PurchasingComponent,
    BillingAdrComponent,
    ShipAdrComponent,
    ConfirmComponent,
    BackButtonComponent,
    AddressComponent,
    OkComponent
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

}
