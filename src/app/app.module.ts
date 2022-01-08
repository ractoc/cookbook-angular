import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";

import {FlexLayoutModule} from "@angular/flex-layout";

import {AppComponent} from './app.component';
import {NavToolbarComponent} from './nav-toolbar/nav-toolbar.component';
import {NavSidebarComponent} from "./nav-sidebar/nav-sidebar.component";
import {HomeComponent} from './home/home.component';
import {LayoutComponent} from './layout/layout.component';
import {RoutingModule} from "./routing/routing.module";

@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
    HomeComponent,
    LayoutComponent,
    NavSidebarComponent,
    NavSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSidenavModule,
    RoutingModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
