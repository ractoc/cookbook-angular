/* tslint:disable */
/* eslint-disable */
export interface IngredientModel {
  amount?: number;
  id?: number;
  inUse?: boolean;
  measurementType: 'GRAM' | 'TEASPOON' | 'TABLESPOON' | 'PIECE' | 'PINCH';
  name: string;
}
