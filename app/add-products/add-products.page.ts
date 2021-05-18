import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {

  formValidation: FormGroup;

  constructor(public router: Router, private formBuilder: FormBuilder, private dbService: DbService) {   }

  ngOnInit() {
    this.resetFields();
  }

  resetFields(){
    this.formValidation = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('',Validators.required),
      image: new FormControl('',Validators.required)
    });
  }

  onSubmit(value){
    let data = {
      name: value.name,
      description: value.description,
      image: value.image
    }
    this.dbService.createProduct(data)
    .then(
      res => {
        this.router.navigate(["/products"]);
      }
    )
  }
}
