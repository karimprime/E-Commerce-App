import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'home',
    renderMode: RenderMode.Client
  },
  {
    path: 'product-details/:id',
    renderMode: RenderMode.Server
  }
,
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];


