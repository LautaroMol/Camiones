import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Carga } from '../../Interfaces/carga';
import { CargaService } from '../../Services/carga.service';
import { CargaFormComponent } from '../../Modals/carga-form/carga-form.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteCargaComponent } from '../../Modals/carga-delete/carga-delete.component';
import { CategoriaService } from '../../Services/categoria.service';
import { Categoria } from '../../Interfaces/categoria';
import { CategoriaDeleteComponent } from '../../Modals/categoria-delete/categoria-delete.component';
import { CategoriaFormComponent } from '../../Modals/categoria-form/categoria-form.component';
import { Cliente } from '../../Interfaces/cliente';
import { ClienteFormComponent } from '../../Modals/cliente-form/cliente-form.component';
import { ClienteService } from '../../Services/cliente.service';
import { ClienteDeleteComponent } from '../../Modals/cliente-delete/cliente-delete.component';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  cargas: Carga[] = [];
  categorias: Categoria[] = [];
  clientes: Cliente[] = [];

  constructor(private cargaService: CargaService, private dialog: MatDialog,
    private categoriaService: CategoriaService, private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.obtenerCargas();
    this.obtenerCategorias();
    this.obtenerClientes();
  }

  obtenerCargas() {
    this.cargaService.getList().subscribe({
      next: (data) => {
        this.cargas = data;
        console.log(this.cargas);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  nuevaCarga() {
    this.dialog.open(CargaFormComponent, {
      disableClose: true,
      width: "400px"
    }).afterClosed().subscribe(result => {
      if (result === "Creada") {
        this.obtenerCargas();
      }
    });
  }

  editarCarga(carga: Carga) {
    this.dialog.open(CargaFormComponent, {
      disableClose: true,
      width: "400px",
      data: carga
    }).afterClosed().subscribe(result => {
      if (result === "Editada") {
        this.obtenerCargas();
      }
    });
  }

  borrarCarga(carga: Carga) {
    this.dialog.open(DeleteCargaComponent, {
      disableClose: true,
      width: "400px",
      data: carga
    }).afterClosed().subscribe(result => {
      if (result === "Eliminar") {
        this.cargaService.delete(carga.idcarga).subscribe({
          next: () => {
            console.log("Carga borrada");
            this.obtenerCargas();
          },
          error: (e) => {
            console.error(e);
          }
        });
      }
    });
  }
  obtenerCategorias() {
    this.categoriaService.getList().subscribe({
      next: (data) => {
        this.categorias = data;
        console.log(this.categorias);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  nuevaCategoria() {
    this.dialog.open(CategoriaFormComponent, {
      disableClose: true,
      width: "400px"
    }).afterClosed().subscribe(result => {
      if (result === "Creada") {
        this.obtenerCategorias();
      }
    });
  }

  editarCategoria(categoria: Categoria) {
    this.dialog.open(CategoriaFormComponent, {
      disableClose: true,
      width: "400px",
      data: categoria
    }).afterClosed().subscribe(result => {
      if (result === "Editada") {
        this.obtenerCategorias();
      }
    });
  }

  borrarCategoria(categoria: Categoria) {
    this.dialog.open(CategoriaDeleteComponent, {
      disableClose: true,
      width: "400px",
      data: categoria
    }).afterClosed().subscribe(result => {
      if (result === "Eliminar") {
        this.categoriaService.delete(categoria.idcategoria).subscribe({
          next: () => {
            console.log("Categoría eliminada");
            this.obtenerCategorias();
          },
          error: (e) => {
            console.error(e);
          }
        });
      }
    });
  }
  obtenerClientes() {
    this.clienteService.getList().subscribe({
      next: (data) => {
        this.clientes = data;
        console.log(this.clientes);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  nuevoCliente() {
    this.dialog.open(ClienteFormComponent, {
      disableClose: true,
      width: "400px",
      data: null
    }).afterClosed().subscribe(result => {
      if (result && result.action === "Creado") {
        this.clientes.push(result.data);
      }
    });
  }
  

  editarCliente(cliente: Cliente) {
    this.dialog.open(ClienteFormComponent, {
      disableClose: true,
      width: "400px",
      data: cliente
    }).afterClosed().subscribe(result => {
      if (result && result.action === "Editado") {
        const index = this.clientes.findIndex(c => c.idcliente === result.data.idcliente);
        if (index !== -1) {
          this.clientes[index] = result.data;
        }
      }
    });
  }

  borrarCliente(cliente: Cliente) {
    this.dialog.open(ClienteDeleteComponent, {
      disableClose: true,
      width: "400px",
      data: cliente
    }).afterClosed().subscribe(result => {
      if (result === "Eliminar") {
        this.clienteService.delete(cliente.idcliente).subscribe({
          next: () => {
            console.log("Cliente eliminado");
            this.obtenerClientes();
          },
          error: (e) => {
            console.error(e);
          }
        });
      }
    });
  }
}