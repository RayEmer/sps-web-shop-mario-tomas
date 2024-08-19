import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'https://fakestoreapi.com/carts';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obtener un carrito por ID
  obtenerCarritoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  obtenerCarritoUsuario(): Observable<any[]> {
    const userId = this.authService.getUserIdFromToken() != null ? this.authService.getUserIdFromToken():0;
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Agregar un nuevo carrito
  agregarCarrito(productos: { productId: number, quantity: number }[]): Observable<any> {
    const userId = this.authService.getUserIdFromToken();
    console.log('User ID:', userId);
    const body = {
      userId: userId,
      date: new Date().toISOString(),
      products: productos
    };
  
    return this.http.post(this.apiUrl, body);
  }

  // Actualizar un carrito existente
  actualizarCarrito(cartId: number, userId: number, products: { productId: number, quantity: number }[]): Observable<any> {
    const body = {
      userId: userId,
      date: new Date().toISOString(),
      products: products
    };

    return this.http.put(`${this.apiUrl}/${cartId}`, body);
  }

  // Finalizar compra (actualiza un carrito existente)
  finalizarCompra(cartId: number, userId: number, products: { productId: number, quantity: number }[]): Observable<any> {
    return this.actualizarCarrito(cartId, userId, products);
  }

  eliminarCarrito(carritoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${carritoId}`);
  }
}
