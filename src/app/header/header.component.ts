import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | Product[];

  constructor(private router: Router, private product: ProductService) {}

  ngOnInit(){
    this.router.events.subscribe((val: any) => {
      if(val.url) {
        if(localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log('Seller Page')
          this.menuType = 'Seller';
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            console.log(this.sellerName);
          }
        }
        else {
          console.log('Outside Seller')
          this.menuType = 'default';
        }
      }
    })
  }

  logOut() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  searchProduct(query: KeyboardEvent) {
    if(query) {
      const element = query.target as HTMLInputElement;
      console.log(element.value);
      this.product.searchProducts(element.value).subscribe((result) => {
        console.log(result);
        if(result.length>3) {
          result.length = 3;
        }
        this.searchResult = result;
      })
    }
  }

  redirectToProductDetails(id: number) {
    this.router.navigate(['/product-details/'+id]);
  }

  hideSearch() {
    this.searchResult = undefined
  }

  submitSearch(val: string) {
    this.router.navigate([`search/${val}`])
  }

}
