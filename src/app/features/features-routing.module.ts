import { Routes } from "@angular/router";
import { authGuard } from "@core/guards/auth.guard";

export const FEATURE_ROUTES : Routes = [
    {path: 'dashboard', pathMatch: 'full', redirectTo: ''},
    {path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
    {
        path: 'grammar', 
        canActivate: [authGuard],
        loadChildren: () => import('./grammar/grammar.module').then(m => m.GrammarModule)
    },
    {
        path: 'listening', 
        canActivate: [authGuard],
        loadChildren: () => import('./listening/listening.module').then(m => m.ListeningModule)
    },
    {
        path: 'reading', 
        canActivate: [authGuard],
        loadChildren: () => import('./reading/reading.module').then(m => m.ReadingModule)
    },
    {
        path: 'writing', 
        canActivate: [authGuard],
        loadChildren: () => import('./writing/writing.module').then(m => m.WritingModule)
    },
    {
        path: 'profile', 
        canActivate: [authGuard],
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
    }
];