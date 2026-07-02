import { Routes } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Vitrine } from './paginas/vitrine/vitrine';
import { Login } from './paginas/auth/login/login';
import { Cadastro } from './paginas/auth/cadastro/cadastro';
import { Inicio } from './paginas/auth/inicio/inicio';
import { Movie } from './shared/movie/movie';
import { Dashboard } from './paginas/admin/dashboard/dashboard';
import { MovieForm } from './paginas/admin/movie-form/movie-form';
import { guardGuard } from './core/guards/guard-guard';
import { Perfis } from './pages/perfis/perfis';
import { MinhaLista } from './paginas/minhalista/minhalista';

export const routes: Routes = [
  { path: 'vitrine', component: Vitrine },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'inicio', component: Inicio },
  { path: 'minhalista', component: MinhaLista },
  {
    path: 'admin',
    canActivate: [guardGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'create', component: MovieForm },
      { path: 'edit/:id', component: Movie },
    ],
  },

  {
    path: 'perfis',
    component: Perfis,
  },
];
