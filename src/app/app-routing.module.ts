import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home',
  loadChildren: () => import('./home/home.module')
                        .then( m => m.HomePageModule),
                        ...canActivate(redirectUnauthorizedTo(['login'])) },
 
  
  { path: 'guardar',
    loadChildren: () => import('./pages/guardar/guardar.module')
                          .then( m => m.GuardarPageModule),
                          ...canActivate(redirectUnauthorizedTo(['login'])) },
   
  
  { path: 'plantilla',
    loadChildren: () => import('./pages/plantilla/plantilla.module')
                          .then( m => m.PlantillaPageModule),
                          ...canActivate(redirectUnauthorizedTo(['login'])) },
   
  {
    path: 'plantilla',
    loadChildren: () => import('./pages/plantilla/plantilla.module').then( m => m.PlantillaPageModule)
  },
  {
    path: 'plantilla-chicago',
    loadChildren: () => import('./pages/plantilla-chicago/plantilla-chicago.module').then( m => m.PlantillaChicagoPageModule)
  },
  {
    path: 'second',
    loadChildren: () => import('./modals/second/second.module').then( m => m.SecondPageModule)
  },
  {
    path: 'guardar',
    loadChildren: () => import('./pages/guardar/guardar.module').then( m => m.GuardarPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  { path: 'profile',
  loadChildren: () => import('./pages/profile/profile.module')
                        .then( m => m.ProfilePageModule),
                        ...canActivate(redirectUnauthorizedTo(['login'])) },
 
{
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
