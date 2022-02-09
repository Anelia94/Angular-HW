import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routingPostsComponent } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CommonModule,
    FormsModule,
    routingPostsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
  ]
})
export class PostsModule { }
