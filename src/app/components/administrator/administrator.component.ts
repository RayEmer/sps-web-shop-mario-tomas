import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../models/articulo.model';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  articulos: Articulo[] = [];
  articuloForm: FormGroup;
  selectedFile: File | null = null;
  loading: boolean = false;

  @ViewChild('addArticuloModal', { static: true }) addArticuloModal!: ElementRef;
  @ViewChild('notificationModal', { static: true }) notificationModal!: ElementRef;
  notificationMessage: string = '';
  constructor(
    private articuloService: ArticuloService,
    private fb: FormBuilder,
    private renderer: Renderer2

  ) {
    this.articuloForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
      rate: [0, Validators.required],
      count: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.articuloService.getArticulos().subscribe(data => {
      this.articulos = data;
    });
  }

  openModal(): void {
    this.addArticuloModal.nativeElement.style.display = 'block';
    this.renderer.addClass(document.body, 'modal-open');
  }

  closeModal(): void {
    this.addArticuloModal.nativeElement.style.display = 'none';
    this.renderer.removeClass(document.body, 'modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      this.renderer.removeChild(document.body, backdrop);
    }
  }

  openNotificationModal(message: string): void {
    this.notificationMessage = message;
    this.notificationModal.nativeElement.style.display = 'block';
    this.renderer.addClass(document.body, 'modal-open');
  }

  closeNotificationModal(): void {
      this.notificationModal.nativeElement.style.display = 'none';
      this.renderer.removeClass(document.body, 'modal-open');
  }

  onSubmit(): void {
    if (this.articuloForm.valid) {
      this.loading = true;
      const articulo = {
        title: this.articuloForm.get('title')?.value,
        price: this.articuloForm.get('price')?.value,
        description: this.articuloForm.get('description')?.value,
        image: this.articuloForm.get('image')?.value,
        category: this.articuloForm.get('category')?.value,
        rate: this.articuloForm.get('rate')?.value,
        count: this.articuloForm.get('count')?.value
      };
  
      this.articuloService.createArticulo(articulo).subscribe(data => {
        this.articulos.push(data);
        this.closeModal();
        this.loading = false;
        this.openNotificationModal('Artículo agregado correctamente');
      });
    }
  }
}
