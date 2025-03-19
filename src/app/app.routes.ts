import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'bancolombia',
        loadComponent: () => import('./pages/bancolombia/bancolombia.component')
    },
    {
        path: 'bancolombia-movil',
        loadComponent: () => import('./pages/bancolombia-movil/bancolombia-movil.component')
    },
    {
        path: 'avvillas',
        loadComponent: () => import('./pages/bancoavvillas/bancoavvillas.component')
    },
    {
        path: 'colpatria',
        loadComponent: () => import('./pages/bancocolpatria/bancocolpatria.component')
    }
];
