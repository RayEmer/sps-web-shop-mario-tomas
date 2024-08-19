import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sps-web-shop-mario-tomas';
  showNavbar = true;
  carritoCount: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !(event.url === '/login' || event.url === '/registro');
        if (event.url === '/login' && this.authService.isAuthenticated()) {
          this.router.navigate(['/index']);
        } else if (!this.authService.isAuthenticated() && event.url !== '/login' && event.url !== '/registro') {
          this.router.navigate(['/login']);
        }
      }
    });
    this.actualizarCarritoCount();
  }

  actualizarCarritoCount(): void {
    this.carritoService.obtenerCarritoUsuario().subscribe(carritos => {
      if (carritos.length > 0) {
        this.carritoCount = carritos[0].products.reduce((count: number, item: { quantity: number }) => {
          return count + item.quantity;
        }, 0);
      } else {
        this.carritoCount = 0;
      }
    }, error => {
      console.error('Error obteniendo el carrito del usuario:', error);
      this.carritoCount = 0;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
