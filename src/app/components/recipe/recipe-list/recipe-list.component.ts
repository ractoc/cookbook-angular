import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RecipeModel} from "../../../api/cookbook/models/recipe-model";
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'app-home',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes!: RecipeModel[];

  searchForm = new FormGroup({
    searchString: new FormControl(),
    searchCategory: new FormControl()
  });

  recipeObserver = {
    parent: this,
    next(recipeData: RecipeModel[]) {
      console.log('Recipes', recipeData);
      this.parent.recipes = recipeData;
    },
    error(error: any) {
      // TODO Implement error handling
      console.error('error', error);
    },
    complete() {
    }
  };

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService
      .findRecipes('')
      .subscribe(this.recipeObserver);
  }

  searchRecipes() {
    this.recipeService
      .findRecipes((this.searchForm.value.searchString) ? this.searchForm.value.searchString.trim() : undefined
        , this.searchForm.value.searchCategory)
      .subscribe(this.recipeObserver);
  }

  getImageUrl(recipe: RecipeModel) {
    return this.recipeService.getImageUrl(recipe);
  }
}
