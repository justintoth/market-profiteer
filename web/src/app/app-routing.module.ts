import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  //{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
