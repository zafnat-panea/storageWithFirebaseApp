import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { DbService } from '../services/db.service';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  idProducto: string; item: any;

  constructor(private route: ActivatedRoute, private dbService : DbService ,private location: Location,
    public alertControler: AlertController, public toastController: ToastController ) { }

  ngOnInit() {
    this.idProducto = this.route.snapshot.paramMap.get("idProducto");
    this.getProducto(this.idProducto);
  }
  
  getProducto(idProducto){
    this.dbService.getProduct(idProducto).then(
      res =>{
        console.log(res);
        this.item = res;
      }
    )
  }

  volverAtras(){
    this.location.back();
  }

  async toastDelete(){
    const toast = await this.toastController.create({
      message: 'Producto borrado con éxito.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async eliminar(){
    const alert = await this.alertControler.create({
      header: '¿Estás a punto de borrar?',
      message: '¿Seguro?',
      buttons:[
        {
          text:'Cancelar',
          role: 'cancel',
          handler: (borrar) =>{
            
          },
        },
        {
          text: 'Borrar',
          handler:() => {
            this.dbService.deleteProduct(this.idProducto).then((res) =>
            {
              this.volverAtras();
              this.toastDelete();
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
