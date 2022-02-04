import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {RecipeModel} from "../../../api/cookbook/models/recipe-model";
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {

  subTitle: String | undefined;
  recipe: RecipeModel | undefined;

  private routeListener$: Subscription | undefined;

  recipeObserver = {
    parent: this,
    next(recipeData: RecipeModel) {
      console.log('Recipe', recipeData);
      this.parent.recipe = recipeData;
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
          this.subTitle = 'Update Recipe';
        }
      );
  }

  ngOnDestroy() {
    this.routeListener$?.unsubscribe();
  }

}
