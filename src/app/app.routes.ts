import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { permissionGuard } from '@core/guards/permission.guard';
import { roleGuard } from '@core/guards/role.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('@features').then((m) => m.FeaturesModule),
  },
  {
    path: 'login',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('@features').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('@features').then((m) => m.AdminModule),
  },

  // Protected routes - require authentication
  // {
  //   path: 'dashboard',
  //   loadComponent: () => import('./features/dashboard/dashboard.component'),
  //   canActivate: [authGuard]
  // },

  // // Protected by role
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./features/admin/admin.routes'),
  //   canActivate: [authGuard, roleGuard(['Admin'])]
  // },

  // // Protected by permission
  // {
  //   path: 'products',
  //   children: [
  //     {
  //       path: '',
  //       loadComponent: () => import('./features/products/pages/product-list.component'),
  //       canActivate: [authGuard, permissionGuard(['VIEW_PRODUCTS'])]
  //     },
  //     {
  //       path: 'create',
  //       loadComponent: () => import('./features/products/pages/product-create.component'),
  //       canActivate: [authGuard, permissionGuard(['CREATE_PRODUCT'])]
  //     },
  //     {
  //       path: ':id/edit',
  //       loadComponent: () => import('./features/products/pages/product-edit.component'),
  //       canActivate: [authGuard, permissionGuard(['UPDATE_PRODUCT'])]
  //     }
  //   ]
  // },

  // Multiple permissions (OR logic)
  // {
  //   path: 'reports',
  //   loadComponent: () => import('./features/reports/reports.component'),
  //   canActivate: [authGuard, permissionGuard(['VIEW_REPORTS', 'VIEW_ADMIN_REPORTS'])]
  // },

  {
    path: '**',
    loadComponent: () => import('@shared').then((m) => m.NotFoundComponent),
  },
];
