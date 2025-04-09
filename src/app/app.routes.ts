import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';

export const routes: Routes = [
   
    { path: 'home', component: HomeComponent },
    { path: 'category/:name', component: CategoryComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: '**', component: NotFoundComponent }, 
];