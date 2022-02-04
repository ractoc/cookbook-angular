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

import { IngredientModel } from '../models/ingredient-model';

@Injectable({
  providedIn: 'root',
})
export class IngredientControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findIngredientById
   */
  static readonly FindIngredientByIdPath = '/ingredient/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findIngredientById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findIngredientById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<IngredientModel>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientControllerService.FindIngredientByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IngredientModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findIngredientById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findIngredientById(params: {
    id: number;
  }): Observable<IngredientModel> {

    return this.findIngredientById$Response(params).pipe(
      map((r: StrictHttpResponse<IngredientModel>) => r.body as IngredientModel)
    );
  }

  /**
   * Path part for operation updateIngredient
   */
  static readonly UpdateIngredientPath = '/ingredient/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateIngredient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateIngredient$Response(params: {
    id: number;
    body: IngredientModel
  }): Observable<StrictHttpResponse<IngredientModel>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientControllerService.UpdateIngredientPath, 'put');
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
        return r as StrictHttpResponse<IngredientModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateIngredient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateIngredient(params: {
    id: number;
    body: IngredientModel
  }): Observable<IngredientModel> {

    return this.updateIngredient$Response(params).pipe(
      map((r: StrictHttpResponse<IngredientModel>) => r.body as IngredientModel)
    );
  }

  /**
   * Path part for operation deleteIngredient
   */
  static readonly DeleteIngredientPath = '/ingredient/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteIngredient()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteIngredient$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientControllerService.DeleteIngredientPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteIngredient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteIngredient(params: {
    id: number;
  }): Observable<number> {

    return this.deleteIngredient$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation findAllIngredients
   */
  static readonly FindAllIngredientsPath = '/ingredient/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllIngredients()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllIngredients$Response(params: {
    searchString: string;
  }): Observable<StrictHttpResponse<Array<IngredientModel>>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientControllerService.FindAllIngredientsPath, 'get');
    if (params) {
      rb.query('searchString', params.searchString, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IngredientModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllIngredients$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllIngredients(params: {
    searchString: string;
  }): Observable<Array<IngredientModel>> {

    return this.findAllIngredients$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IngredientModel>>) => r.body as Array<IngredientModel>)
    );
  }

  /**
   * Path part for operation saveIngredient
   */
  static readonly SaveIngredientPath = '/ingredient/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveIngredient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveIngredient$Response(params: {
    body: IngredientModel
  }): Observable<StrictHttpResponse<IngredientModel>> {

    const rb = new RequestBuilder(this.rootUrl, IngredientControllerService.SaveIngredientPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IngredientModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveIngredient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveIngredient(params: {
    body: IngredientModel
  }): Observable<IngredientModel> {

    return this.saveIngredient$Response(params).pipe(
      map((r: StrictHttpResponse<IngredientModel>) => r.body as IngredientModel)
    );
  }

}
