import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaProductsPageRoutingModule } from './lista-products-routing.module';

import { ListaProductsPage } from './lista-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaProductsPageRoutingModule
  ],
  declarations: [ListaProductsPage]
})
export class ListaProductsPageModule {}
