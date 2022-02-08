/* tslint:disable */
/* eslint-disable */
import { RecipeIngredientModel } from './recipe-ingredient-model';
export interface RecipeModel {
  description?: string;
  id?: number;
  imageFileName?: string;
  name?: string;
  recipeIngredients?: Array<RecipeIngredientModel>;
}
