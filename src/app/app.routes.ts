import { AuthComponent } from './features/layout/auth/auth.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged-user/logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', title: 'Home', loadComponent: () => import('./features/pages/home/home.component').then(c => c.HomeComponent) },
  {
    path: 'auth',
    component: AuthComponent,
    title: 'Dashboard Auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', title: 'Login', canActivate: [loggedGuard], loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent) },
      { path: 'register', title: 'Register', canActivate: [loggedGuard], loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent) },
      { path: 'forget-password', title: 'Forget Password', canActivate: [loggedGuard], loadComponent: () => import('./features/auth/forget-password/forget-password.component').then(c => c.ForgetPasswordComponent) },
      { path: 'verify-reset-code', title: 'Reset Code Validation', canActivate: [loggedGuard], loadComponent: () => import('./features/auth/verify-reset-code/verify-reset-code.component').then(c => c.VerifyResetCodeComponent) },
      { path: 'reset-password', title: 'Change Password', canActivate: [loggedGuard], loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(c => c.ResetPasswordComponent) },
    ]
  },
  { path: 'products', title: 'Products', canActivate: [authGuard], loadComponent: () => import('./features/pages/products/products.component').then(c => c.ProductsComponent) },
  { path: 'categories', title: 'Categories', canActivate: [authGuard], loadComponent: () => import('./features/pages/categories/categories.component').then(c => c.CategoriesComponent) },
  { path: 'brands', title: 'Brands', canActivate: [authGuard], loadComponent: () => import('./features/pages/brands/brands.component').then(c => c.BrandsComponent) },
  { path: 'cart', title: 'Your Cart', canActivate: [authGuard], loadComponent: () => import('./features/pages/cart/cart.component').then(c => c.CartComponent) },
  { path: 'wishlist', title: 'Your Wishlist', canActivate: [authGuard], loadComponent: () => import('./features/pages/wishlist/wishlist.component').then(c => c.WishlistComponent) },

  { path: 'product-details/:id', title: 'Product Details', canActivate: [authGuard], loadComponent: () => import('./features/pages/product-details/product-details.component').then(c => c.ProductDetailsComponent) },
  { path: 'checkout/:cartId', title: 'Checkout', canActivate: [authGuard], loadComponent: () => import('./features/pages/checkout/checkout.component').then(c => c.CheckoutComponent) },

  // Not Found Page
  { path: '**', title: 'Not Found', loadComponent: () => import('./features/pages/not-found/not-found.component').then(c => c.NotFoundComponent) },
];
