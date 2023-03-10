import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  addProductMessage: string | undefined;

  constructor(private product: ProductService, private router: Router) {}

  addProduct(data: Product){
    this.product.addProduct(data).subscribe((result) => {
      console.log(result)
      if(result) {
        this.addProductMessage = "Product is successfully added"
      }
      setTimeout(() => {this.addProductMessage = undefined; this.router.navigate(['seller-home'])}, 3000);
    })
  }

}
