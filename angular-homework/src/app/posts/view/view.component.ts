import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Post } from '../posts';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {
  private postId: string = '';
  public post: any;
  private destroy$ = new Subject();

  constructor(private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.postId = data['id'];
    })

    this.postsService.getPostById(this.postId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Post) => this.post = res,
        error: (err) => console.error(err)
      })
  }


  ngOnDestroy() {
    this.destroy$.next(true);
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == 'true'){
       window.location.href = `./delete/${this.postId}`;
      }else{
        window.location.href = `./view/${this.postId}`;
      }
    })
  }
}
