import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout';
import { ToolbarComponent } from './toolbar';
import {LoginComponent} from "../containers/login";
import {SpinnerComponent} from "./spinner";

export const COMPONENTS = [
  LayoutComponent,
  ToolbarComponent,
  LoginComponent,
  SpinnerComponent
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
