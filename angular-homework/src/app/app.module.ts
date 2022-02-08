import { HttpClientModule } from '@angular/common/http';
import {  NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsService } from './posts/posts.service';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './posts/all-posts/index.component';
import { AddComponent } from './posts/add/add.component';
import { ViewComponent } from './posts/view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { MaterialModule } from './shared/material.module';
import { EditComponent } from './posts/edit/edit.component';
import { DeleteComponent } from './posts/delete/delete.component';
import { DialogComponent } from './dialog/dialog.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexComponent,
    AddComponent,
    ViewComponent,
    EditComponent,
    DeleteComponent,
    DialogComponent,
    ErrorPageComponent
  ],
  entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
