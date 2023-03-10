import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  productList: undefined | Product[];
  productMessage: undefined | string;
  editIcon = faEdit;
  deleteIcon = faTrash;

  constructor(private product: ProductService) {}

  ngOnInit(){
    this.getProductList();
  }

  getProductList(){
    this.product.productList().subscribe((result) => {
      console.log(result)
      this.productList = result;
    })
  }

  deleteProduct(id: number){
    console.log(id)
    this.product.deleteProduct(id).subscribe((result) => {
      console.log(result)
      if(result) {
        this.productMessage = "Product is Deleted"
        this.getProductList();
      }
    })
    setTimeout(() => {this.productMessage = undefined}, 3000);
  }
}
