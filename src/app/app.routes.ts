import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'bancolombia',
        loadComponent: () => import('./pages/bancolombia/bancolombia.component')
    },
    {
        path: 'avvillas',
        loadComponent: () => import('./pages/bancoavvillas/bancoavvillas.component')
    }
];
