import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RecipeControllerService} from "../api/cookbook/services/recipe-controller.service";
import {RecipeModel} from "../api/cookbook/models/recipe-model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private httpClient: HttpClient, private recipeController: RecipeControllerService) {
  }

  findRecipes(searchString: string): Observable<RecipeModel[]> {
    return this.recipeController.findAllRecipes({searchString: searchString})
      .pipe(
        catchError(RecipeService.handleError)
      );
  }

  loadRecipe(recipeId: number): Observable<RecipeModel> {
    return this.recipeController.findRecipeById({id: recipeId})
      .pipe(
        catchError(RecipeService.handleError)
      );
  }

  saveRecipe(recipe: RecipeModel): Observable<RecipeModel> {
    return this.recipeController.saveRecipe({body: recipe})
      .pipe(
        catchError(RecipeService.handleError)
      );
  }

  uploadImage(recipeId: number, imageFile: File): Observable<RecipeModel> {
    return this.recipeController.uploadImage({id: recipeId, body: {file: imageFile}})
      .pipe(
        catchError(RecipeService.handleError)
      );
  }

  getImageUrl(recipe: RecipeModel) {
    if (recipe.imageFileName) {
      return this.recipeController.rootUrl + "/recipe/downloadImage/" + recipe.imageFileName;
    } else {
      return undefined;
    }
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
