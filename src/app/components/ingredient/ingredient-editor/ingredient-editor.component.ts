import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from "../../../api/cookbook/models/ingredient-model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IngredientService} from "../../../services/ingredient.service";

@Component({
  selector: 'app-ingredient-editor',
  templateUrl: './ingredient-editor.component.html',
  styleUrls: ['./ingredient-editor.component.css']
})
export class IngredientEditorComponent implements OnInit, OnDestroy {

  subTitle: String | undefined;
  ingredient: IngredientModel | undefined;

  // TODO load list from server
  measurementTypes = [
    'GRAM',
    'TEASPOON',
    'TABLESPOON',
    'PIECE',
    'PINCH',
  ]

  private routeListener$: Subscription | undefined;

  ingredientForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50)
    ]),
    measurementType: new FormControl(),
  });

  ingredientObserver = {
    parent: this,
    next(ingredientData: IngredientModel) {
      this.parent.subTitle = 'Update Ingredient';
      this.parent.ingredient = ingredientData;
      this.parent.initIngredientForm();
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
    private ingredientService: IngredientService
  ) {
  }

  ngOnInit(): void {
    this.routeListener$ = this.route.params
      .subscribe((params: any) => {
          if (params.id) {
            this.loadIngredient(params.id);
            this.subTitle = 'Update Ingredient';
          } else {
            this.ingredient = undefined;
            this.subTitle = 'New Ingredient';
            this.initIngredientForm();
          }
        }
      );
  }

  ngOnDestroy() {
    this.routeListener$?.unsubscribe();
  }

  cancel() {
    if (this.ingredient) {
      this.initIngredientForm();
    }
    this.router.navigateByUrl('/ingredients');
  }

  saveIngredient() {
    this.ingredientService.saveIngredient(this.ingredientForm.value).subscribe(this.ingredientObserver);
  }

  private loadIngredient(ingredientId: number) {
    this.ingredientService.loadIngredient(ingredientId).subscribe(this.ingredientObserver);
  }

  private initIngredientForm() {
    if (this.ingredient) {
      this.ingredientForm.controls['id'].setValue(this.ingredient.id);
      this.ingredientForm.controls['name'].setValue(this.ingredient.name);
      this.ingredientForm.controls['measurementType'].setValue(this.ingredient.measurementType);
    } else {
      this.ingredientForm.controls['measurementType'].setValue(this.measurementTypes[0]);
    }
  }

}
