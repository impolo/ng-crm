import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout';
import { ToolbarComponent } from './toolbar';
import {LoginComponent} from "../containers/login";
import {SpinnerComponent} from "./spinner";
import {AddressComponent} from "./address.component";

import {AutoCompleteModule} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';

export const COMPONENTS = [
  LayoutComponent,
  ToolbarComponent,
  LoginComponent,
  SpinnerComponent,
  AddressComponent
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    AutoCompleteModule,
    InputMaskModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
