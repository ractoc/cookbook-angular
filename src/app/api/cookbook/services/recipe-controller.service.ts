/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { RecipeModel } from '../models/recipe-model';
import { SimpleRecipeModel } from '../models/simple-recipe-model';
import { StepModel } from '../models/step-model';

@Injectable({
  providedIn: 'root',
})
export class RecipeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation addStep
   */
  static readonly AddStepPath = '/recipe/{recipeId}/step';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addStep()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addStep$Response(params: {
    recipeId: number;
    body: StepModel
  }): Observable<StrictHttpResponse<RecipeModel>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.AddStepPath, 'put');
    if (params) {
      rb.path('recipeId', params.recipeId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecipeModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addStep$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addStep(params: {
    recipeId: number;
    body: StepModel
  }): Observable<RecipeModel> {

    return this.addStep$Response(params).pipe(
      map((r: StrictHttpResponse<RecipeModel>) => r.body as RecipeModel)
    );
  }

  /**
   * Path part for operation findRecipeById
   */
  static readonly FindRecipeByIdPath = '/recipe/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findRecipeById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findRecipeById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RecipeModel>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.FindRecipeByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecipeModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findRecipeById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findRecipeById(params: {
    id: number;
  }): Observable<RecipeModel> {

    return this.findRecipeById$Response(params).pipe(
      map((r: StrictHttpResponse<RecipeModel>) => r.body as RecipeModel)
    );
  }

  /**
   * Path part for operation updateRecipe
   */
  static readonly UpdateRecipePath = '/recipe/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRecipe()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRecipe$Response(params: {
    id: number;
    body: RecipeModel
  }): Observable<StrictHttpResponse<RecipeModel>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.UpdateRecipePath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecipeModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateRecipe$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRecipe(params: {
    id: number;
    body: RecipeModel
  }): Observable<RecipeModel> {

    return this.updateRecipe$Response(params).pipe(
      map((r: StrictHttpResponse<RecipeModel>) => r.body as RecipeModel)
    );
  }

  /**
   * Path part for operation deleteRecipe
   */
  static readonly DeleteRecipePath = '/recipe/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRecipe()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRecipe$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.DeleteRecipePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteRecipe$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRecipe(params: {
    id: number;
  }): Observable<number> {

    return this.deleteRecipe$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation updateStep
   */
  static readonly UpdateStepPath = '/recipe/{recipeId}/step/{stepId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStep()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStep$Response(params: {
    recipeId: number;
    stepId: number;
    body: StepModel
  }): Observable<StrictHttpResponse<RecipeModel>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.UpdateStepPath, 'post');
    if (params) {
      rb.path('recipeId', params.recipeId, {});
      rb.path('stepId', params.stepId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecipeModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateStep$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStep(params: {
    recipeId: number;
    stepId: number;
    body: StepModel
  }): Observable<RecipeModel> {

    return this.updateStep$Response(params).pipe(
      map((r: StrictHttpResponse<RecipeModel>) => r.body as RecipeModel)
    );
  }

  /**
   * Path part for operation removeStep
   */
  static readonly RemoveStepPath = '/recipe/{recipeId}/step/{stepId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeStep()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeStep$Response(params: {
    recipeId: number;
    stepId: number;
  }): Observable<StrictHttpResponse<RecipeModel>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.RemoveStepPath, 'delete');
    if (params) {
      rb.path('recipeId', params.recipeId, {});
      rb.path('stepId', params.stepId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecipeModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeStep$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeStep(params: {
    recipeId: number;
    stepId: number;
  }): Observable<RecipeModel> {

    return this.removeStep$Response(params).pipe(
      map((r: StrictHttpResponse<RecipeModel>) => r.body as RecipeModel)
    );
  }

  /**
   * Path part for operation switchSteps
   */
  static readonly SwitchStepsPath = '/recipe/{recipeId}/step/switch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `switchSteps()` instead.
   *
   * This method doesn't expect any request body.
   */
  switchSteps$Response(params: {
    recipeId: number;
    stepA: number;
    stepB: number;
  }): Observable<StrictHttpResponse<RecipeModel>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.SwitchStepsPath, 'post');
    if (params) {
      rb.path('recipeId', params.recipeId, {});
      rb.query('stepA', params.stepA, {});
      rb.query('stepB', params.stepB, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecipeModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `switchSteps$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  switchSteps(params: {
    recipeId: number;
    stepA: number;
    stepB: number;
  }): Observable<RecipeModel> {

    return this.switchSteps$Response(params).pipe(
      map((r: StrictHttpResponse<RecipeModel>) => r.body as RecipeModel)
    );
  }

  /**
   * Path part for operation addOrUpdateIngredient
   */
  static readonly AddOrUpdateIngredientPath = '/recipe/{recipeId}/ingredient/{ingredientId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addOrUpdateIngredient()` instead.
   *
   * This method doesn't expect any request body.
   */
  addOrUpdateIngredient$Response(params: {
    recipeId: number;
    ingredientId: number;
    amount: number;
  }): Observable<StrictHttpResponse<RecipeModel>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.AddOrUpdateIngredientPath, 'post');
    if (params) {
      rb.path('recipeId', params.recipeId, {});
      rb.path('ingredientId', params.ingredientId, {});
      rb.query('amount', params.amount, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecipeModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addOrUpdateIngredient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addOrUpdateIngredient(params: {
    recipeId: number;
    ingredientId: number;
    amount: number;
  }): Observable<RecipeModel> {

    return this.addOrUpdateIngredient$Response(params).pipe(
      map((r: StrictHttpResponse<RecipeModel>) => r.body as RecipeModel)
    );
  }

  /**
   * Path part for operation removeIngredient
   */
  static readonly RemoveIngredientPath = '/recipe/{recipeId}/ingredient/{ingredientId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeIngredient()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeIngredient$Response(params: {
    recipeId: number;
    ingredientId: number;
  }): Observable<StrictHttpResponse<RecipeModel>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.RemoveIngredientPath, 'delete');
    if (params) {
      rb.path('recipeId', params.recipeId, {});
      rb.path('ingredientId', params.ingredientId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecipeModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeIngredient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeIngredient(params: {
    recipeId: number;
    ingredientId: number;
  }): Observable<RecipeModel> {

    return this.removeIngredient$Response(params).pipe(
      map((r: StrictHttpResponse<RecipeModel>) => r.body as RecipeModel)
    );
  }

  /**
   * Path part for operation uploadImage
   */
  static readonly UploadImagePath = '/recipe/{id}/uploadImage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadImage()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadImage$Response(params: {
    id: number;
    body: {
'file': Blob;
}
  }): Observable<StrictHttpResponse<RecipeModel>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.UploadImagePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecipeModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadImage$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadImage(params: {
    id: number;
    body: {
'file': Blob;
}
  }): Observable<RecipeModel> {

    return this.uploadImage$Response(params).pipe(
      map((r: StrictHttpResponse<RecipeModel>) => r.body as RecipeModel)
    );
  }

  /**
   * Path part for operation findAllRecipes
   */
  static readonly FindAllRecipesPath = '/recipe/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllRecipes()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRecipes$Response(params: {
    searchString: string;
  }): Observable<StrictHttpResponse<Array<SimpleRecipeModel>>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.FindAllRecipesPath, 'get');
    if (params) {
      rb.query('searchString', params.searchString, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SimpleRecipeModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllRecipes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllRecipes(params: {
    searchString: string;
  }): Observable<Array<SimpleRecipeModel>> {

    return this.findAllRecipes$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SimpleRecipeModel>>) => r.body as Array<SimpleRecipeModel>)
    );
  }

  /**
   * Path part for operation saveRecipe
   */
  static readonly SaveRecipePath = '/recipe/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveRecipe()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveRecipe$Response(params: {
    body: RecipeModel
  }): Observable<StrictHttpResponse<RecipeModel>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.SaveRecipePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RecipeModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveRecipe$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveRecipe(params: {
    body: RecipeModel
  }): Observable<RecipeModel> {

    return this.saveRecipe$Response(params).pipe(
      map((r: StrictHttpResponse<RecipeModel>) => r.body as RecipeModel)
    );
  }

  /**
   * Path part for operation downloadFile
   */
  static readonly DownloadFilePath = '/recipe/downloadImage/{fileName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFile$Response(params: {
    fileName: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, RecipeControllerService.DownloadFilePath, 'get');
    if (params) {
      rb.path('fileName', params.fileName, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFile(params: {
    fileName: string;
  }): Observable<Blob> {

    return this.downloadFile$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
