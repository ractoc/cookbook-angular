import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {RecipeDetailsComponent} from "../recipe-details/recipe-details.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'recipe', component: RecipeDetailsComponent, pathMatch: 'full'},
  {path: 'recipe/:id', component: RecipeDetailsComponent},
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
