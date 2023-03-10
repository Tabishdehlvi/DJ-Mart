import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {

  productData: undefined | Product;
  productMessage: undefined | string;

  constructor(private activeRouter: ActivatedRoute, private product: ProductService, private router: Router) {}

  ngOnInit() {
    let productId = this.activeRouter.snapshot.paramMap.get('id')
    console.log(productId)
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.log(data)
      this.productData = data;
    })
  }

  update(data: Product){
    console.log(data)
    if(this.productData){
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((result) => {
      if(result){
        this.productMessage = "Product has updated";
      }
    })
    setTimeout(() => {this.productMessage = undefined;  this.router.navigate(['seller-home'])}, 2000);
  }
  

}
