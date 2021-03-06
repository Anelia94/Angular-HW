import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './posts/add/add.component';
import { EditComponent } from './posts/edit/edit.component';
import { IndexComponent } from './posts/all-posts/index.component';
import { ViewComponent } from './posts/view/view.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add', component: AddComponent },
  { path: 'index', component: IndexComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponent = [HomeComponent, ErrorPageComponent]
export const routingPostsComponent = [AddComponent, EditComponent, IndexComponent, ViewComponent];
