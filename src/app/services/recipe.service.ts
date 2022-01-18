import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Recipe} from "./model/recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: Recipe[] = [];

  constructor() {
  }

  findRecipes(searchString: string): Observable<Recipe[]> {
    console.log('searchString', searchString);
    return of(this.recipes.filter(r => {
      console.log('r', r);
      if (searchString && searchString.trim()) {
        return r.name.toLowerCase().includes(searchString.toLowerCase());
      }
      return r;
    }));
  }

  saveRecipe(recipe: Recipe): Observable<Recipe> {
    recipe.id = this.recipes.length + 1;
    this.recipes.push(recipe);
    return of(recipe);
  }
}
