import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from "../../../api/cookbook/models/recipe-model";
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  @Input("recipe")
  recipe!: RecipeModel;

  constructor(
    private recipeService: RecipeService
  ) {
  }

  ngOnInit(): void {
  }

  getImageUrl(recipe: RecipeModel) {
    return this.recipeService.getImageUrl(recipe);
  }

  getCategory(recipe: RecipeModel) {
    if (recipe.recipeCategory == 'BREAKFAST') {
      return "Ontbijt";
    } else if (recipe.recipeCategory == 'LUNCH') {
      return "Lunch";
    } else if (recipe.recipeCategory == 'DINNER') {
      return "Diner";
    } else if (recipe.recipeCategory == 'SNACK') {
      return "Tussendoortje";
    } else {
      return 'Onbekend';
    }
  }

}
