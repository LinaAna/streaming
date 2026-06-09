import { Routes } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Vitrine } from './paginas/vitrine/vitrine';

export const routes: Routes = [
    {path: "vitrine", component: Vitrine},
    {path: '',redirectTo: "vitrine", pathMatch:'full'}
];
