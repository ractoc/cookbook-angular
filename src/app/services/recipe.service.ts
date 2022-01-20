import {Injectable} from '@angular/core';
import {catchError, Observable, of, throwError} from "rxjs";
import {Recipe} from "./model/recipe";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: Recipe[] = [];

  constructor(private httpClient: HttpClient) {
  }

  findRecipes(searchString: string): Observable<Recipe[]> {
    console.log('searchString', searchString);
    return of(this.recipes.filter(r => {
      console.log('r', r);
      if (searchString && searchString.trim()) {
        return r.name.toLowerCase().includes(searchString.toLowerCase());
      }
      return r;
    }));
  }

  saveRecipe(recipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>("http://localhost:8080/api/recipe/", recipe)
      .pipe(
        catchError(RecipeService.handleError)
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
