import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Perfil } from '../../core/interfaces/perfil';
import { PerfilService } from '../../core/services/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  headerService = inject(HeaderService);
  perfilService = inject(PerfilService);
  router = inject(Router);

  ngOnInit(): void {
    this.headerService.titulo.set("Perfil");

    if(this.perfilService.perfil()){
      this.perfil = {...this.perfilService.perfil()!}
    }
  }

  perfil: Perfil = {
    nombre:"",
    direccion:"",
    detalleEntrega:"",
    telefono:""
  }

  guardarDatosPerfil(){
    this.perfilService.guardarDatos(this.perfil);
    this.router.navigate(['/carrito']);
  }

}
