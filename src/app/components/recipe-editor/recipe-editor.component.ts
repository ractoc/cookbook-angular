import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeModel} from "../../api/cookbook/models/recipe-model";
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css']
})
export class RecipeEditorComponent implements OnInit, OnDestroy {

  subTitle: String | undefined;
  recipe: RecipeModel | undefined;

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

  recipeObserver = {
    parent: this,
    next(recipeData: RecipeModel) {
      console.log('Recipe', recipeData);
      this.parent.recipe = recipeData;
      this.parent.initRecipeForm();
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
          if (params.id) {
            this.loadRecipe(params.id);
            this.subTitle = 'Update Recipe';
          } else {
            this.recipe = undefined;
            this.subTitle = 'New Recipe';
            this.initRecipeForm();
          }
        }
      );
  }

  ngOnDestroy() {
    this.routeListener$?.unsubscribe();
  }

  cancel() {
    if (this.recipe) {
      this.initRecipeForm();
    }
  }

  saveRecipe() {
    this.recipeService.saveRecipe({
      id: this.recipeForm.value.id,
      name: this.recipeForm.value.name,
      description: this.recipeForm.value.description,
    }).subscribe(this.recipeObserver);
  }

  onFileSelected(event:any) {
    console.log('file selected', event);
    const file:File = event.target.files[0];
    if (this.recipe?.id && file) {
      this.recipeService.uploadImage(this.recipe.id, file).subscribe(this.recipeObserver);
    }
  }

  private loadRecipe(recipeId: number) {
    this.recipeService.loadRecipe(recipeId).subscribe(this.recipeObserver);
  }

  private initRecipeForm() {
    if (this.recipe) {
      this.recipeForm.controls['id'].setValue(this.recipe.id);
      this.recipeForm.controls['name'].setValue(this.recipe.name);
      this.recipeForm.controls['description'].setValue(this.recipe.description);
    }
  }
}
