import { Routes } from "@angular/router";
import { authGuard } from "@core/guards/auth.guard";

export const FEATURE_ROUTES : Routes = [
    {path: 'dashboard', pathMatch: 'full', redirectTo: ''},
    {path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
    {
        path: 'grammar', 
        canActivate: [authGuard],
        loadChildren: () => import('./grammar/grammar.module').then(m => m.GrammarModule)}
];