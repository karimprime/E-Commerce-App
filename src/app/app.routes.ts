import { CategoriesComponent } from './features/pages/categories/categories.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { ProductsComponent } from './features/pages/products/products.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { NotFoundComponent } from './features/pages/not-found/not-found.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { ForgetPasswordComponent } from './features/auth/forget-password/forget-password.component';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home', canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, title: 'Cart', canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, title: 'Products', canActivate: [authGuard] },
  { path: 'categories', component: CategoriesComponent, title: 'Categories', canActivate: [authGuard] },
  { path: 'brands', component: BrandsComponent, title: 'Brands', canActivate: [authGuard] },

  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'forget-password', component: ForgetPasswordComponent, title: 'Forget Password' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: '**', component: NotFoundComponent },
];
