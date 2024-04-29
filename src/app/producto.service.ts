import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Producto {
  product_id: number;
  nombreProducto: string;
  precioUnitario: number;
  unidadesStock: number;
  categoria: number;
}


export const entorno = {
  HOST :'http://localhost:8080'
}


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url: string = `${entorno.HOST}/productos`;
  
  productoCambio = new Subject<Producto[]>();

  constructor(private http:HttpClient) { }
 
  listar(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url)
    .pipe(
      map(data => {return data.sort((a,b) => a.product_id-b.product_id)})
    );
  }
  listarPorId(id:number) {
    return this.http.get<Producto>(`${this.url}/${id}`)
  }

  alta(p:Producto){
    console.log('ha llegado al servicio '+p.nombreProducto)
    return this.http.post(this.url,p);
  }

  modificar(p: Producto) {
    console.log('modificar con el empleado SU NUMERO ES (' +p.product_id+ ' '+ p.nombreProducto)
    return this.http.put(this.url,p);
  }

  eliminarProducto(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}

  /*
  obtenerTodos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url);
  }

  crearProducto(p:Producto): Observable<Producto>{
    console.log(p)
    return this.http.post<Producto>(this.url, p);
  }

  eliminarProducto(product_id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${product_id}`);
  }

  modificarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/${producto.product_id}`, producto);
  }
*/
