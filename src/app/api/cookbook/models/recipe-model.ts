/* tslint:disable */
/* eslint-disable */
import { RecipeIngredientModel } from './recipe-ingredient-model';
import { StepModel } from './step-model';
export interface RecipeModel {
  description?: string;
  id?: number;
  imageFileName?: string;
  name?: string;
  recipeCategory?: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  recipeIngredients?: Array<RecipeIngredientModel>;
  steps?: Array<StepModel>;
}
