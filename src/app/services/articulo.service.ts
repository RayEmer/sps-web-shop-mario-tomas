import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '../models/articulo.model';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  createArticulo(articulo: Partial<Articulo>): Observable<Articulo> {
    return this.http.post<Articulo>(this.apiUrl, articulo);
  }
  
  getArticulo(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.apiUrl}/${id}`);
  }
}
