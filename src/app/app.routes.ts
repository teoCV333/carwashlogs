import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'bancolombia',
        loadComponent: () => import('./pages/bancolombia/bancolombia.component')
    }
];
