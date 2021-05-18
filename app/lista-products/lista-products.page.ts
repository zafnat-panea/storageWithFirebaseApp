import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-lista-products',
  templateUrl: './lista-products.page.html',
  styleUrls: ['./lista-products.page.scss'],
})
export class ListaProductsPage implements OnInit {

  items: Array<any>;

  constructor(private dbService:DbService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.dbService.getProductsPublic().valueChanges().subscribe(
      res=>{
        console.log(res);
        this.items=res;
      }
    )
  }
}
