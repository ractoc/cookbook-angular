import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IngredientModel} from "../../../api/cookbook/models/ingredient-model";
import {IngredientService} from "../../../services/ingredient.service";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {

  ingredients: IngredientModel[] = [];
  @ViewChild(MatTable) ingredientTable!: MatTable<IngredientModel>;
  displayedColumns: string[] = ['name', 'measurementType', 'actions'];

  searchForm = new FormGroup({
    searchString: new FormControl(),
  });

  ingredientObserver = {
    parent: this,
    next(ingredientData: IngredientModel[]) {
      ingredientData.sort((im1: IngredientModel, im2: IngredientModel) => {
        if (im1.name === undefined || im2.name === undefined) {
          console.error("Ingredient with emtpy name found, this should not happen because Name is mandatory");
          return 0;
        } else {
          return im1.name.localeCompare(im2.name);
        }
      });
      this.parent.ingredients = ingredientData;
      this.parent.ingredientTable.renderRows();
    },
    error(error: any) {
      // TODO Implement error handling
      console.error('error', error);
    },
    complete() {
    }
  };

  constructor(private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.ingredientService.findIngredients('').subscribe(this.ingredientObserver);
  }

  searchIngredients() {
    this.ingredientService.findIngredients(this.searchForm.value.searchString.trim()).subscribe(this.ingredientObserver);
  }

  searchDisabled() {
    return !this.searchForm.value.searchString || this.searchForm.value.searchString.trim().length < 4;
  }
}
