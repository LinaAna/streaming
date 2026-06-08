import { Routes } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';

export const routes: Routes = [
    {path: "navbar", component: Navbar},
    {path: '',redirectTo: "navbar", pathMatch:'full'}
];
