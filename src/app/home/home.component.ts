import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../services/recipe.service";
import {Recipe} from "../services/model/recipe";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipes!: Recipe[];

  searchForm = new FormGroup({
    searchString: new FormControl(),
  });

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.findRecipes('').subscribe(
      (recipeData: Recipe[]) => {
        this.recipes = recipeData;
      }
    );
  }

  searchRecipes() {
    this.recipeService.findRecipes(this.searchForm.value.searchString.trim()).subscribe(
      (recipeData: Recipe[]) => {
        this.recipes = recipeData;
      }
    );
  }

  searchDisabled() {
    return !this.searchForm.value.searchString || this.searchForm.value.searchString.trim().length < 4;
  }
}
