import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IngredientControllerService} from "../api/cookbook/services/ingredient-controller.service";
import {catchError, Observable, throwError} from "rxjs";
import {RecipeModel} from "../api/cookbook/models/recipe-model";
import {IngredientModel} from "../api/cookbook/models/ingredient-model";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpClient: HttpClient, private ingredientController: IngredientControllerService) {
  }

  findIngredients(searchString: string): Observable<RecipeModel[]> {
    return this.ingredientController.findAllIngredients({searchString: searchString})
      .pipe(
        catchError(IngredientService.handleError)
      );
  }

  loadIngredient(ingredientId: number): Observable<RecipeModel> {
    return this.ingredientController.findIngredientById({id: ingredientId})
      .pipe(
        catchError(IngredientService.handleError)
      );
  }

  saveIngredient(ingredient: IngredientModel): Observable<IngredientModel> {
    return this.ingredientController.saveIngredient({body: ingredient})
      .pipe(
        catchError(IngredientService.handleError)
      );
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => 'Something bad happened; please try again later.');
  }




}
