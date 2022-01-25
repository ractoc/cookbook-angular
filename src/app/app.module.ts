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

import {ApiModule as CookbookApiModule} from "./api/cookbook/api.module";

import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {RoutingModule} from "./routing/routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HttpClientModule} from "@angular/common/http";
import {NavToolbarComponent} from "./components/nav-toolbar/nav-toolbar.component";
import {NavSidebarComponent} from "./components/nav-sidebar/nav-sidebar.component";
import {HomeComponent} from "./components/home/home.component";
import {SubHeaderComponent} from "./components/sub-header/sub-header.component";
import {RecipeEditorComponent} from "./components/recipe-editor/recipe-editor.component";
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
    HomeComponent,
    LayoutComponent,
    NavSidebarComponent,
    NavSidebarComponent,
    RecipeEditorComponent,
    SubHeaderComponent,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CookbookApiModule.forRoot({ rootUrl: 'http://localhost:8080/api' }),
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
