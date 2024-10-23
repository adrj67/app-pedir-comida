import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Busqueda } from '../../core/interfaces/busqueda';
import { ProductosService } from '../../core/services/productos.service';
import { TarjetaProductoComponent } from "../../core/components/tarjeta-producto/tarjeta-producto.component";
import { Producto } from '../../core/interfaces/productos';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, FormsModule, TarjetaProductoComponent, RouterModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss'
})
export class BuscarComponent {
  headerService = inject(HeaderService);
  productosService = inject(ProductosService);

  productos: WritableSignal<Producto[]> = signal([]);

  ngOnInit(): void {
    this.headerService.titulo.set("Buscar");
    this.productosService.getAll().then(res => this.productos.set(res));
  }

  parametrosBusqueda: Busqueda = {
    texto:"",
    aptoCeliaco:false,
    aptoVegano:false,
  }

  async buscar(){
    this.productos.set(await this.productosService.buscar(this.parametrosBusqueda));
    
  }
}
