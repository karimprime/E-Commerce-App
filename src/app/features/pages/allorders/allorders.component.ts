import { Component, inject, signal, Renderer2, ElementRef, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy, computed } from '@angular/core';
import { OrdersService } from '../../../core/services/ecommerce/orders/orders.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartItem, Orders } from '../../../shared/interface/orders';
import { Meta } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { PaginationComponent } from "../../layout/additions/pagination/pagination.component";
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  imports: [DatePipe, PaginationComponent, RouterLink, TranslatePipe],
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllordersComponent implements OnInit {

  private readonly ordersService = inject(OrdersService);
  private readonly authService = inject(AuthService);
  private readonly renderer = inject(Renderer2);
  private readonly meta = inject(Meta);

  allOrders = signal<Orders[]>([]);
  cartItems = signal<CartItem[]>([]);
  isOpen = signal(false);

  ordersPerPage: number = 10;
  currentPage: number = 1;

  @ViewChild('modalContent', { static: false }) modalContent!: ElementRef;
  private clickListener!: () => void;

  constructor() {
    this.meta.addTag({ name: 'description', content: 'View all your orders and their details.' });
  }

  //for translate

  translateDir(): boolean {
    return localStorage.getItem('lng') === 'ar';
  }

  // Compute paginated orders
  getTotalPages(): number {
    return Math.ceil(this.allOrders().length / this.ordersPerPage);
  }

  getPaginatedOrders() {
    const startIndex = (this.currentPage - 1) * this.ordersPerPage;
    return this.allOrders()
      .slice()
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(startIndex, startIndex + this.ordersPerPage);

  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }

  openModal(index: number) {
    this.isOpen.set(true);
    this.cartItems.set(this.getPaginatedOrders()[index].cartItems);

    this.addClickListener();
  }

  closeModal() {
    this.isOpen.set(false);
    this.removeClickListener();
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }


  handleOutsideClick = (event: Event) => {
    if (this.modalContent && this.modalContent.nativeElement && !this.modalContent.nativeElement.contains(event.target as Node)) {
      this.closeModal();
    }
  };

  addClickListener() {
    this.clickListener = this.renderer.listen('document', 'click', this.handleOutsideClick);
  }

  removeClickListener() {
    if (this.clickListener) {
      this.clickListener();
    }
  }

  ngOnInit() {
    this.getUserOrders();
  }

  ngOnDestroy() {
    this.removeClickListener();
    this.meta.removeTag("name='description'");
  }

  getUserOrders() {
    this.authService.userData.subscribe({
      next: (res) => {
        if (res?.id) {
          this.ordersService.getUserOrders(res.id).subscribe({
            next: (orders) => this.allOrders.set(orders)
          });
        }
      }
    });
  }
}
