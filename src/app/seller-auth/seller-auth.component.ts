import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, Signup } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

showLogin = false;
authError = '';

  constructor(private seller : SellerService, private router: Router) {}

  ngOnInit():void {
    this.seller.reloadSeller()
  }


  signUp(data: Signup):void {
    this.seller.userSignUp(data)
  }
  login(data: Login):void {
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError) => {
      if(isError){
        this.authError = "Email or Password is not correct";
      }
    })
  }


  openLogin(){
    this.showLogin = true;
  }
  openSignup(){
    this.showLogin = false;
  }
}
