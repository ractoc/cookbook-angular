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
import {SubHeaderComponent} from "./components/sub-header/sub-header.component";
import {RecipeEditorComponent} from "./components/recipe/recipe-editor/recipe-editor.component";
import {RecipeDetailsComponent} from "./components/recipe/recipe-details/recipe-details.component";
import {environment} from "../environments/environment";
import { IngredientEditorComponent } from './components/ingredient/ingredient-editor/ingredient-editor.component';
import { IngredientDetailsComponent } from './components/ingredient/ingredient-details/ingredient-details.component';
import { IngredientListComponent } from './components/ingredient/ingredient-list/ingredient-list.component';
import {RecipeListComponent} from "./components/recipe/recipe-list/recipe-list.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
    RecipeListComponent,
    LayoutComponent,
    NavSidebarComponent,
    NavSidebarComponent,
    RecipeEditorComponent,
    RecipeDetailsComponent,
    SubHeaderComponent,
    IngredientEditorComponent,
    IngredientDetailsComponent,
    IngredientListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CookbookApiModule.forRoot({rootUrl: environment.endpointBaseUri}),
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
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
