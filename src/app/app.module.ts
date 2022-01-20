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
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
    HomeComponent,
    LayoutComponent,
    NavSidebarComponent,
    NavSidebarComponent,
    RecipeDetailsComponent,
    SubHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSidenavModule,
    RoutingModule,
    MatListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
