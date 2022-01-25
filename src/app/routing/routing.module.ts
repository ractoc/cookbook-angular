import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../components/home/home.component";
import {RecipeEditorComponent} from "../components/recipe-editor/recipe-editor.component";
import {RecipeDetailsComponent} from "../components/recipe-details/recipe-details.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'recipe/new', component: RecipeEditorComponent, pathMatch: 'full'},
  {path: 'recipe/edit/:id', component: RecipeEditorComponent},
  {path: 'recipe/details/:id', component: RecipeDetailsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class RoutingModule {
}
