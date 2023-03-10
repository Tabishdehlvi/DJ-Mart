import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productData: undefined | Product;
  productQuantity : number = 1;

  constructor(private activateRoute: ActivatedRoute, private product: ProductService) {}

  ngOnInit() {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result;
      console.log(this.productData);
    })
  }

  handleQuantity(val: string) {
    if(this.productQuantity <20 && val == 'plus') {
      this.productQuantity += 1;
    }
    else if(this.productQuantity >1 && val == 'minus') {
      this.productQuantity -= 1;

    }
  }

}
