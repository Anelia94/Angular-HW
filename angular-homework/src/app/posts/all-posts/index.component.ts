import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Post } from '../posts';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  public postsData: Post[] = [];
  public displayedColumns = ['id', 'title', 'desc', 'actions'];
  private destroy$ = new Subject();
  private postId: string = '';

  constructor(private postsService: PostsService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.postId = data['id'];
    })

    this.postsService.getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Post[]) => this.postsData = res,
        error: () => window.location.href = './error'
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  openDialog(id: string) {
    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      
      if (result == 'true') {
        window.location.href = `./delete/${id}`;
      } else {
        window.location.href = `./view/${this.postId}`;
      }
    })
  }
}
