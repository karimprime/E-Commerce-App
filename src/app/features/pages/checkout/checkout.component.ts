import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../../core/services/ecommerce/orders/orders.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
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

  isCityDropdownOpen = false;
  cities = [
    'Cairo', 'Alexandria', 'Giza', 'Port Said', 'Suez', 'Luxor', 'Aswan', 'Mansoura', 'Tanta', 'Zagazig',
    'Ismailia', 'Faiyum', 'Sohag', 'Assiut', 'Damietta', 'Sharm El Sheikh', 'Hurghada', 'Minya', 'Bani Suef'
  ];

  // Toggle the city dropdown
  toggleCityDropdown(): void {
    this.isCityDropdownOpen = !this.isCityDropdownOpen;
  }

  // Select a city and update the form control value
  selectCity(city: string): void {
    this.checkForm.get('city')?.setValue(city);
    this.checkForm.get('city')?.markAsTouched();
    this.checkForm.get('city')?.markAsDirty();
    this.isCityDropdownOpen = false;
  }

  // Close the dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!(event.target as HTMLElement).closest('.relative')) {
      this.isCityDropdownOpen = false;
    }
  }

  translateDir(): boolean {
    return localStorage.getItem('lng') === 'ar';
  }

  ngOnInit() {
    this.getCartId();
    this.initForm();
  }

  getCartId() {
    this.cartId = this.activatedRoute.snapshot.params['cartId'];
  }

  initForm() {
    this.checkForm = new FormGroup({
      details: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^(01)[0125][0-9]{8}$')]),
      paymentMethod: new FormControl('', [Validators.required]) // Add payment method field
    });
  }

  onSubmit() {
    if (this.checkForm.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.isLoading = true;

    const paymentMethod = this.checkForm.get('paymentMethod')?.value;

    if (paymentMethod === 'cash') {
      this.completeOrder();
    } else if (paymentMethod === 'online') {
      this.onlinePayment();
    }
  }

  completeOrder() {
    this.ordersService.cashOrders(this.cartId, this.checkForm.value).subscribe({
      next: (res) => {
        console.log("checkout res", res.data._id);
        this.isLoading = false;
      }
    });
  }

  onlinePayment() {
    this.ordersService.onlinePayment(this.cartId, this.checkForm.value).subscribe({
      next: (res) => {
        console.log("checkout res", res);
        window.location.href = res.session.url;
      }
    });
  }
}
