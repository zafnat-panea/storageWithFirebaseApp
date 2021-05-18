import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  items: Array<any>;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.route && this.route.data){
      this.getData();
    }
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Por favor, espere...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.items = data;
      })
    })
  }

  async presentLoading(loading){
    return await loading.present();
  }

  logout(){
    this.router.navigate(["/home"]);
    this.authService.doLogout()
    .then(res => {
      console.log("User logout");
    }), err => {
      console.log(err);
    }
  }

  
}
