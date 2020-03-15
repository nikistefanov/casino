import { RouterModule, Routes } from '@angular/router';

const APP_ROUTES: Routes = [
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

// scrollPositionRestoration will always scroll to top when route changes
export const appRouting = RouterModule.forRoot(APP_ROUTES, { scrollPositionRestoration: 'enabled' });
