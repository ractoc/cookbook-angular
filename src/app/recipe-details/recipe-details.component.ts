import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../services/model/recipe";
import {RecipeService} from "../services/recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  subTitle: String | undefined;
  editing: boolean = false;
  recipe: Recipe | undefined;

  private routeListener$: Subscription | undefined;

  recipeForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50)]),
    description: new FormControl(null, [
      Validators.minLength(25),
      Validators.maxLength(250)]),
    image: new FormControl(),
  });

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
  }

  ngOnInit(): void {
    this.routeListener$ = this.route.params
      .subscribe((params: any) => {
          if (params.id) {
            this.subTitle = 'Recipe Details';
            RecipeDetailsComponent.loadRecipe(params.id);
          } else {
            this.recipe = undefined;
            this.initRecipeForm();
          }
        }
      );
  }

  editRecipe() {
    this.recipeForm.controls['name'].enable();
    this.editing = true;
    if (this.recipe) {
      this.subTitle = 'Update Recipe';
    } else {
      this.subTitle = 'New Recipe';
    }
  }

  cancel() {
    if (this.recipe) {
      this.subTitle = 'Recipe Details';
      this.initRecipeForm();
    }
  }

  saveRecipe() {
    this.recipeService.saveRecipe({
      id: this.recipeForm.value.id,
      name: this.recipeForm.value.name,
      description: this.recipeForm.value.description,
    });
  }

  private static loadRecipe(recipeId: number) {
    console.log('loading recipe: ' + recipeId);
  }

  private initRecipeForm() {
    if (this.recipe) {
      this.recipeForm.controls['id'].setValue(this.recipe.id);
      this.recipeForm.controls['name'].setValue(this.recipe.name);
      this.recipeForm.controls['name'].disable();
      this.recipeForm.controls['description'].setValue(this.recipe.description);
      this.recipeForm.controls['description'].disable();

      this.subTitle = 'Recipe Details';
      this.editing = false;
    } else {
      this.editRecipe();
    }
  }
}
