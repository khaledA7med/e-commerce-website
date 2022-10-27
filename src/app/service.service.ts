import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _HttpClient:HttpClient) { }
  getAllProducts():Observable<any>{
    return this._HttpClient.get(`https://fakestoreapi.com/products/`)
  }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`https://fakestoreapi.com/products/categories/`)
  }

  getProductsByCategory(key:string):Observable<any>{
    return this._HttpClient.get(`https://fakestoreapi.com/products/category/`+ key)
  }

  getProductById(id:any):Observable<any>{
    return this._HttpClient.get(`https://fakestoreapi.com/products/`+id)
  }

  createNewCart(model:any):Observable<any>{
    return this._HttpClient.post(`https://fakestoreapi.com/carts/`, model)
  }

}
