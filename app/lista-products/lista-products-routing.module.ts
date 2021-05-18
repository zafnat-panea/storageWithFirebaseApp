import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaProductsPage } from './lista-products.page';

const routes: Routes = [
  {
    path: '',
    component: ListaProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaProductsPageRoutingModule {}
