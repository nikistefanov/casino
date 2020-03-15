import { RouterModule, Routes } from '@angular/router';
import { ROUTE_PATHS } from './constants/routes';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

const APP_ROUTES: Routes = [
    {
        path: ROUTE_PATHS.EMPTY,
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: ROUTE_PATHS.HOME,
        component: HomeComponent
    },
    {
        path: ROUTE_PATHS.NOT_FOUND,
        component: NotFoundComponent
    },
    {
        path: ROUTE_PATHS.WILDCARD,
        redirectTo: ROUTE_PATHS.NOT_FOUND,
        pathMatch: 'full'
    }
];

// scrollPositionRestoration will always scroll to top when route changes
export const appRouting = RouterModule.forRoot(APP_ROUTES, { scrollPositionRestoration: 'enabled' });
