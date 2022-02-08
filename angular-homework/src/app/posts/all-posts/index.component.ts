import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router) { }

  ngOnInit(): void {
    this.postsService.getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Post[]) => this.postsData = res,
        error: () => this.router.navigateByUrl('/error'),
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  openDialog(id: string) {
    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        const url: string = `/delete/${id}`;
        this.router.navigateByUrl(url);
      } else {
        this.router.navigateByUrl('/index');
      }
    })
  }
}
