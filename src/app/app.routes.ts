import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';

export const routes: Routes = [
    {path: '', redirectTo: '/index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
    {path: 'details/:id', component: PokemonInfoComponent},
];
