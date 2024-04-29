import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../producto.service';
import { AltaproductoComponent } from '../altaproducto/altaproducto.component';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [AltaproductoComponent,RouterModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit{
  
  constructor(private servicio: ProductoService) {}
  productos: Producto[] = [];
  ngOnInit(): void {
    this.servicio.productoCambio.subscribe((data) => {this.productos = data})

    this.servicio.listar() 
      .subscribe(datos => {
        this.productos = datos;
        console.log("entra por aquí");
    })
  }
    eliminarProducto(id: number) {
      this.servicio.eliminarProducto(id).subscribe(() => {
        this.servicio.listar()
          .subscribe(data => this.servicio.productoCambio.next(data)); 
    });
  }

  recibirAviso(listaActualizada:Observable<Producto[]>){
    console.warn("regresa el padre ----")
    listaActualizada.subscribe(data => this.productos = data);
    this.servicio.listar()
    .subscribe(datos => {
       this.productos = datos;
       console.log("entra");

    })
}

}

  /*
  nuevoProducto: Producto = { product_id: 0, nombreProducto: '', precioUnitario: 0, unidadesStock: 0, categoria: 0};
  productoSeleccionado: Producto | null = null;


    mostrarProductos: boolean = false;

    this.obtenerProductos();
    this.altaProducto();
  }

  obtenerProductos(): void {
    this.servicio.obtenerTodos().subscribe(data => {
      this.productos = data;
    });
  }

  altaProducto(): void {
    this.servicio.crearProducto(this.nuevoProducto).subscribe(() => {
      window.location.reload(); 
    });
  }

  
  seleccionarProducto(producto: Producto): void {
    this.productoSeleccionado = { ...producto };
  }

  modificarProducto(): void {
    if (this.productoSeleccionado) {
      this.servicio.modificarProducto(this.productoSeleccionado).subscribe(() => {
        window.location.reload(); 
      });
    }
  }

*/


