import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './all-posts/index.component';
import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [
    CommonModule,
    AddComponent,
    EditComponent,
    IndexComponent,
    ViewComponent,
    FormsModule,
    DeleteComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
  ]
})
export class PostsModule { }
