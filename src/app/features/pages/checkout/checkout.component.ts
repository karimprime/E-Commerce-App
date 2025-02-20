import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../../core/services/ecommerce/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);
  private router = inject(Router);
  errorMessage: string = "";
  isLoading: boolean = false;
  cartId!: string;
  checkForm!: FormGroup;

  ngOnInit() {
    this.getCartId();
    this.initForm();
  }

  getCartId() {
    this.cartId = this.activatedRoute.snapshot.params['cartId'];
  }

  initForm() {
    this.checkForm = new FormGroup({
      details: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^(01)[0125][0-9]{8}$')])
    })
  }

  completeOrder() {
    this.ordersService.cashOrders(this.cartId, this.checkForm.value).subscribe({
      next: (res) => {
        console.log("checkout res", res.data._id);
      }
    })
  }
  onlinePayment() {
    this.ordersService.onlinePayment(this.cartId, this.checkForm.value).subscribe({
      next: (res) => {
        console.log("checkout res", res);
        window.location.href = res.session.url
      }
    })
  }

}



