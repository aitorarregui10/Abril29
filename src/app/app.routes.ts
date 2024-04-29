import { Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { AltaproductoComponent } from './altaproducto/altaproducto.component';

export const routes: Routes = [

    {path: '', component:ListaProductosComponent, children:
    [{path: 'alta', component: AltaproductoComponent},
    {path: 'edicion/:id', component: AltaproductoComponent}
    ]
    }
];
