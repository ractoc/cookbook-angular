import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {RecipeModel} from "../../../api/cookbook/models/recipe-model";
import {RecipeService} from "../../../services/recipe.service";
import {RecipeIngredientModel} from "../../../api/cookbook/models/recipe-ingredient-model";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {

  recipe: RecipeModel | undefined;
  ingredients: RecipeIngredientModel[] | undefined;
  numberOfPeople = 1;

  private routeListener$: Subscription | undefined;

  displayedIngredientColumns: string[] = ['name', 'amount'];
  displayedStepsColumns: string[] = ['step', 'description'];

  recipeObserver = {
    parent: this,
    next(recipeData: RecipeModel) {
      console.log('Recipe', recipeData);
      this.parent.recipe = recipeData;
      this.parent.numberOfPeople = 1;
      this.parent.calculateIngredients();
      if (recipeData.steps) {
        this.parent.recipe.steps = recipeData.steps.sort((stepA, stepB) => stepA.stepCounter - stepB.stepCounter);
      }
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
    private recipeService: RecipeService
  ) {
  }

  ngOnInit(): void {
    this.routeListener$ = this.route.params
      .subscribe((params: any) => {
          this.recipeService.loadRecipe(params.id).subscribe(this.recipeObserver);
        }
      );
  }

  ngOnDestroy() {
    this.routeListener$?.unsubscribe();
  }

  getImageUrl(recipe: RecipeModel) {
    return this.recipeService.getImageUrl(recipe);
  }

  addPerson() {
    this.numberOfPeople++;
    this.calculateIngredients();
  }

  substractPerson() {
    if (this.numberOfPeople > 1) {
      this.numberOfPeople--;
      this.calculateIngredients();
    }
  }

  private calculateIngredients() {
    if (this.recipe && this.recipe.recipeIngredients) {
      this.ingredients = this.recipe.recipeIngredients.map(ingredient => {
        if (ingredient.amount) {
          return {
            ingredient: ingredient.ingredient,
            amount: ingredient.amount * this.numberOfPeople
          };
        } else {
          return ingredient;
        }
      });
    }
  }

  displayMeasurementType(ingredient: any) {
    switch (ingredient.measurementType) {
      case 'PIECE':
        return 'stuks';
      default:
        return 'gram';
    }
  }
}
