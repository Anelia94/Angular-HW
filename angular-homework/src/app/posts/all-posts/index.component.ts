import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
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
  public displayedColumns: string[] = ['id', 'title', 'desc', 'actions'];

  private destroy$ = new Subject();
  private postsSubscription: Subscription = new Subscription;

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
    this.postsSubscription.unsubscribe();
  }

  openDialog(id: string) {
    console.log(id);
    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.deletePostFromTable(id);
        this.router.navigateByUrl('./home');
      } else {
        this.router.navigateByUrl('/index');
      }
    })
  }

  deletePostFromTable(id:string) {
    this.postsSubscription = this.postsService.deletePost(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: () => this.router.navigateByUrl('/error'),
      })
  }
}
