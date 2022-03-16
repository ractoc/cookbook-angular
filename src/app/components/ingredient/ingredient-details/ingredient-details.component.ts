import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from "../../../api/cookbook/models/ingredient-model";
import {ActivatedRoute} from "@angular/router";
import {IngredientService} from "../../../services/ingredient.service";
import {Subscription} from "rxjs";
import {RecipeModel} from "../../../api/cookbook/models/recipe-model";
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.css']
})
export class IngredientDetailsComponent implements OnInit, OnDestroy {
  ingredient: IngredientModel | undefined;
  recipes!: RecipeModel[];

  private routeListener$: Subscription | undefined;

  ingredientObserver = {
    parent: this,
    next(ingredientData: IngredientModel) {
      this.parent.ingredient = ingredientData;
      if (this.parent.ingredient.id) {
        this.parent.recipeService.findRecipesForIngredient(this.parent.ingredient.id).subscribe(this.parent.recipeObserver);
      }
    },
    error(error: any) {
      // TODO Implement error handling
      console.error('error', error);
    },
    complete() {
    }
  };

  recipeObserver = {
    parent: this,
    next(recipeData: RecipeModel[]) {
      this.parent.recipes = recipeData;
    },
    error(error: any) {
      // TODO Implement error handling
      console.error('error', error);
    },
    complete() {
    }
  };

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private recipeService: RecipeService
  ) {
  }

  ngOnInit(): void {
    this.routeListener$ = this.route.params
      .subscribe((params: any) => {
          this.ingredientService.loadIngredient(params.id).subscribe(this.ingredientObserver);
        }
      );
  }

  ngOnDestroy() {
    this.routeListener$?.unsubscribe();
  }

  getImageUrl(recipe: RecipeModel) {
    return this.recipeService.getImageUrl(recipe);
  }

}
