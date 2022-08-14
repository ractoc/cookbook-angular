import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RecipeEditorComponent} from "../components/recipe/recipe-editor/recipe-editor.component";
import {RecipeDetailsComponent} from "../components/recipe/recipe-details/recipe-details.component";
import {IngredientEditorComponent} from "../components/ingredient/ingredient-editor/ingredient-editor.component";
import {IngredientDetailsComponent} from "../components/ingredient/ingredient-details/ingredient-details.component";
import {RecipeListComponent} from "../components/recipe/recipe-list/recipe-list.component";
import {IngredientListComponent} from "../components/ingredient/ingredient-list/ingredient-list.component";

const routes: Routes = [
  {path: 'home', component: RecipeListComponent},
  {path: 'recipe/new', component: RecipeEditorComponent, pathMatch: 'full'},
  {path: 'recipe/edit/:id', component: RecipeEditorComponent},
  {path: 'recipe/details/:id', component: RecipeDetailsComponent},
  {path: 'ingredients', component: IngredientListComponent},
  {path: 'ingredient/new', component: IngredientEditorComponent, pathMatch: 'full'},
  {path: 'ingredient/edit/:id', component: IngredientEditorComponent},
  {path: 'ingredient/details/:id', component: IngredientDetailsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [
    RouterModule
  ],
})
export class RoutingModule {
}
