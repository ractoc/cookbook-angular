import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, startWith, Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeModel} from "../../../api/cookbook/models/recipe-model";
import {RecipeService} from "../../../services/recipe.service";
import {RecipeIngredientModel} from "../../../api/cookbook/models/recipe-ingredient-model";
import {MatTable} from "@angular/material/table";
import {IngredientModel} from "../../../api/cookbook/models/ingredient-model";
import {IngredientService} from "../../../services/ingredient.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css']
})
export class RecipeEditorComponent implements OnInit, OnDestroy {

  subTitle: String | undefined;
  recipe: RecipeModel | undefined;
  ingredients: RecipeIngredientModel[] = [];
  ingredientsList: IngredientModel[] = [];
  filteredIngredients: Observable<IngredientModel[]> | undefined;

  @ViewChild(MatTable) ingredientTable!: MatTable<IngredientModel>;
  displayedColumns: string[] = ['name', 'amount', 'actions'];

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


  ingredientForm = new FormGroup({
      ingredient: new FormControl(),
      amount: new FormControl(null, [
        Validators.min(1)])
    }
  );

  recipeObserver = {
    parent: this,
    next(recipeData: RecipeModel) {
      this.parent.subTitle = 'Update Recipe';
      this.parent.recipe = recipeData;
      this.parent.initRecipeForm();
      this.parent.initIngredientForm();
      if (recipeData.recipeIngredients) {
        this.parent.ingredients = recipeData.recipeIngredients;
        if (this.parent.ingredients && this.parent.ingredients.length > 0 && this.parent.ingredientTable) {
          this.parent.ingredientTable.renderRows();
        }
      }
    },
    error(error: any) {
      // TODO Implement error handling
      console.error('error', error);
    },
    complete() {
    }
  };

  ingredientObserver = {
    parent: this,
    next(ingredientData: IngredientModel[]) {
      this.parent.ingredientsList = ingredientData;
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
    private router: Router,
    private recipeService: RecipeService,
    private ingredientService: IngredientService
  ) {
  }

  ngOnInit(): void {
    this.routeListener$ = this.route.params
      .subscribe((params: any) => {
          if (params.id) {
            this.loadRecipe(params.id);
            this.loadAllIngredients();
            this.subTitle = 'Update Recipe';
          } else {
            this.recipe = undefined;
            this.subTitle = 'New Recipe';
            this.initRecipeForm();
          }
        }
      );
    this.filteredIngredients = this.ingredientForm.controls['ingredient'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterIngredients(value)),
    );
  }

  ngOnDestroy() {
    this.routeListener$?.unsubscribe();
  }

  cancel() {
    if (this.recipe) {
      this.initRecipeForm();
    }
    this.router.navigateByUrl('/home');
  }

  saveRecipe() {
    this.recipeService.saveRecipe({
      id: this.recipeForm.value.id,
      name: this.recipeForm.value.name,
      description: this.recipeForm.value.description,
    }).subscribe(this.recipeObserver);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
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

  private initIngredientForm() {
    if (this.recipe) {
      this.ingredientForm.reset();
    }
  }

  getImageUrl(recipe: RecipeModel) {
    return this.recipeService.getImageUrl(recipe);
  }

  editIngredient(recipeIngredient: RecipeIngredientModel) {
    console.log('editing recipeIngredient', recipeIngredient);
    this.ingredientForm.controls['ingredient'].setValue(recipeIngredient.ingredient);
    this.ingredientForm.controls['amount'].setValue(recipeIngredient.amount);
  }

  addIngredient() {
    if (this.recipe && this.recipe.id && this.ingredientForm.value.amount) {
      this.recipeService.addIngredient(this.recipe.id,
        this.ingredientForm.value.ingredient.id,
        this.ingredientForm.value.amount)
        .subscribe(this.recipeObserver);
    } else {
      console.error('unable to add an ingredient since the recipe or amount has not been saved yet');
    }
  }

  removeIngredient(recipeIngredient: RecipeIngredientModel) {
    if (this.recipe && this.recipe.id && recipeIngredient.ingredient && recipeIngredient.ingredient.id) {
      this.recipeService.removeIngredient(this.recipe.id,
        recipeIngredient.ingredient.id)
        .subscribe(this.recipeObserver);
    } else {
      console.error('unable to add an ingredient since the recipe or ingredient has not been selected');
    }
  }

  private loadAllIngredients() {
    this.ingredientService.findIngredients('').subscribe(this.ingredientObserver);
  }

  private filterIngredients(value: any): IngredientModel[] {
    console.log('filtering', value);
    if (value) {
      const filterValue = typeof value === 'string' ? value.toLowerCase() : value.name.toLowerCase();
      return this.ingredientsList.filter((option: IngredientModel) => option.name.toLowerCase().includes(filterValue));
    } else {
      return this.ingredientsList;
    }
  }

  displayIngredient(ingredient: IngredientModel): string {
    return ingredient && ingredient.name ? ingredient.name : '';
  }
}
