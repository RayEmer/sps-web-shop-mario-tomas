import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../models/articulo.model';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  articulos: Articulo[] = [];
  @ViewChild('notificationModal', { static: true }) notificationModal!: ElementRef;
  notificationMessage: string = '';

  constructor(private articuloService: ArticuloService, private carritoService: CarritoService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.articuloService.getArticulos().subscribe(data => {
      this.articulos = data;
    });
  }

  agregarAlCarrito(articulo: Articulo): void {
    const product = { productId: articulo.id, quantity: 1 };
  
    this.carritoService.agregarCarrito([product]).subscribe(response => {
      this.mostrarNotificacion('Artículo agregado al carrito.');
    });
  }

  obtenerCarrito(): any[] {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }

  mostrarNotificacion(mensaje: string): void {
    this.notificationMessage = mensaje;
    this.renderer.setStyle(this.notificationModal.nativeElement, 'display', 'block');
    this.renderer.addClass(document.body, 'modal-open');
  }

  closeNotificationModal(): void {
    this.renderer.setStyle(this.notificationModal.nativeElement, 'display', 'none');
    this.renderer.removeClass(document.body, 'modal-open');
  }
}
