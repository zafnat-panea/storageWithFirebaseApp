import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolverService } from './products-resolver.service';

import { ProductsPage } from './products.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
    resolve: {
      data: ProductsResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
