import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, ProductoService } from '../producto.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-altaproducto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './altaproducto.component.html',
  styleUrl: './altaproducto.component.css'
})
export class AltaproductoComponent implements OnInit {

  form:FormGroup;
  product_id:number = 0;
  edicion:boolean=false;

  constructor(
        private route:ActivatedRoute,
        private router: Router,
        private servicio: ProductoService
  ){this.form = new FormGroup({
    'product_id': new FormControl(0),
    'nombreProducto': new FormControl(''),
    'precioUnitario': new FormControl(0),
    'unidadesStock':new FormControl(0),
    'categoria':new FormControl(0)
  });}

  ngOnInit(): void {
    

    this.route.params
      .subscribe(data => {
      this.product_id = data['product_id'];
      this.edicion= data['product_id'] != null;
      this.formaFormulario();

  });
}
  formaFormulario() {
    if(this.edicion){
      this.servicio.listarPorId(this.product_id)
        .subscribe(data => {
          this.form = new FormGroup({
            'product_id': new FormControl(data.product_id),
            'nombreProducto': new FormControl(data.nombreProducto),
            'precioUnitario': new FormControl(data.precioUnitario),
            'unidadesStock':new FormControl(data.unidadesStock),
            'categoria':new FormControl(data.categoria)
          });
        })
    }
  }
  
operar(){
  let p:Producto = {
    'product_id': this.form.value['product_id'],
    'nombreProducto' : this.form.value['nombreProducto'],
    'precioUnitario': this.form.value['precioUnitario'],
    'unidadesStock':this.form.value['unidadesStock'],
    'categoria':this.form.value['categoria']
  }
  if(this.edicion){
   
    this.servicio.modificar(p)
    .subscribe(()=>{
      this.servicio.listar()
        .subscribe(data=>{
          this.servicio.productoCambio.next(data);
        });
    });

  }else{


    this.servicio.alta(p)
      .subscribe(()=>{
        this.servicio.listar()
          .subscribe(data => {
            this.servicio.productoCambio.next(data);
          });
      });
  


  }


  this.router.navigate([''])
}
  


}
