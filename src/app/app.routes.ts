import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Home', loadComponent: () => import('./features/pages/home/home.component').then(c => c.HomeComponent) },
  { path: 'products', title: 'Products', canActivate: [authGuard], loadComponent: () => import('./features/pages/products/products.component').then(c => c.ProductsComponent) },
  { path: 'categories', title: 'Categories', canActivate: [authGuard], loadComponent: () => import('./features/pages/categories/categories.component').then(c => c.CategoriesComponent) },
  { path: 'brands', title: 'Brands', canActivate: [authGuard], loadComponent: () => import('./features/pages/brands/brands.component').then(c => c.BrandsComponent) },

  { path: 'product-details/:id', title: 'Product Details', canActivate: [authGuard], loadComponent: () => import('./features/pages/product-details/product-details.component').then(c => c.ProductDetailsComponent) },
  { path: 'checkout/:cartId', title: 'Checkout', canActivate: [authGuard], loadComponent: () => import('./features/pages/checkout/checkout.component').then(c => c.CheckoutComponent) },
  { path: 'cart', title: 'Cart Of Products', canActivate: [authGuard], loadComponent: () => import('./features/pages/cart/cart.component').then(c => c.CartComponent) },

  { path: 'register', title: 'Register', loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent) },
  { path: 'login', title: 'Login', loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent) },
  { path: 'forget-password', title: 'Forget Password', loadComponent: () => import('./features/auth/forget-password/forget-password.component').then(c => c.ForgetPasswordComponent) },
  { path: 'verify-reset-code', title: 'Reset Code Validation', loadComponent: () => import('./features/auth/verify-reset-code/verify-reset-code.component').then(c => c.VerifyResetCodeComponent) },
  { path: 'reset-password', title: 'Change Password', loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(c => c.ResetPasswordComponent) },
  { path: '**', loadComponent: () => import('./features/pages/not-found/not-found.component').then(c => c.NotFoundComponent) },
];
