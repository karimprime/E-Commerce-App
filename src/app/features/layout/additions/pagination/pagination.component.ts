import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.pageChanged.emit(newPage);
    }
  }
  translateDir(): boolean {
    return localStorage.getItem('lng') === 'ar';
  }


  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  visiblePages(): number[] {
    let pagesToShow = 3;
    if (window.innerWidth > 640) pagesToShow = 5;

    let start = Math.max(1, this.currentPage - Math.floor(pagesToShow / 2));
    let end = Math.min(this.totalPages, start + pagesToShow - 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  ngOnInit() {
    this.visiblePages();
  }

}
