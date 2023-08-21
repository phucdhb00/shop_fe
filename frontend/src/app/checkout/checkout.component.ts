import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}
  
  ngOnInit() {
    console.log('Checkout component initialized.');
  
    const userId = localStorage.getItem('user_id');
    const jwt = localStorage.getItem('access_token');
  
    if (userId && jwt) {
      const userIdNumber = +userId;
      console.log('User ID number:', userIdNumber);

      this.cartService.getCartItems(userIdNumber).subscribe(
        (cart: any) => {
          console.log('Received cart data:', cart);
          this.cartItems = cart.cart.cartItems.map((item: any) => ({
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
            subTotal: item.subTotal
          }));
        },
        (error: any) => {
          console.error('Error fetching cart items:', error);
        }
      );
    } else {
      console.error('User ID or JWT token not found in local storage.');
    }
  }
}
