import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { ArticuloService } from '../../services/articulo.service';
import { CarritoArticulo } from '../../models/carrito-articulo.model';
import { Carrito } from '../../models/carrito.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {

  @ViewChild('notificacionModal') notificacionModal!: ElementRef;
  notificationMessage = '';
  carrito: CarritoArticulo[] = [];
  total = 0;

  constructor(
    private carritoService: CarritoService,
    private articuloService: ArticuloService // Asegúrate de tener este servicio disponible
  ) {}

  ngOnInit(): void {
    this.carritoService.obtenerCarritoUsuario().subscribe((carritos) => {
      if (carritos.length > 0) {
        this.carrito = carritos[0].products.map((producto: Product) => ({
          id: producto.productId,
          title: `Producto ${producto.productId}`, // Esto se actualizará con la información real
          price: 0, // Esto se actualizará con la información real
          quantity: producto.quantity,
          image: '', // Esto se actualizará con la información real
        }));

        // Obtener los detalles de cada producto
        this.carrito.forEach((item) => {
          this.articuloService.getArticulo(item.id).subscribe((articulo) => {
            item.title = articulo.title;
            item.price = articulo.price;
            item.image = articulo.image;
            this.calcularTotal();
          });
        });
      }
    });
  }

  eliminarDelCarrito(articulo: CarritoArticulo): void {
    this.carrito = this.carrito.filter((item) => item.id !== articulo.id);
    this.calcularTotal();
  }

  finalizarCompra(): void {
    const carritoId = this.carrito[0].id;
    this.carritoService.eliminarCarrito(carritoId).subscribe(response => {
      this.notificationMessage = '¡Compra finalizada con éxito!';
      this.openNotificationModal();
      this.carrito = [];
      this.total = 0;
    });
  }
  

  calcularTotal(): void {
    this.total = this.carrito.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  openNotificationModal(): void {
    const modal = this.notificacionModal.nativeElement;
    modal.style.display = 'block';
  }

  closeNotificationModal(): void {
    const modal = this.notificacionModal.nativeElement;
    modal.style.display = 'none';
  }
}
