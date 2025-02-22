import { Component, OnInit, inject } from '@angular/core';
import { BrandsService } from '../../../core/services/ecommerce/brands/brands.service';
import { IBrands } from '../../../shared/interface/brands';

import { TranslationService } from '../../../core/services/i18n/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  IProductsBrands: IBrands[] = [];
  isLoading = true;
  errorMessage = '';

  private readonly brandsService = inject(BrandsService);
  private readonly translationService = inject(TranslationService);


  ngOnInit() {
    this.getAllBrands();
  }

  getAllBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.IProductsBrands = res.data;
        this.isLoading = false;
      }
    });
  }

  changeLang(lang: string) {
    this.translationService.changeLang(lang);
  }

}
