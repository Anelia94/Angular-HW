import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Post } from '../posts';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {
  public post: any;

  private destroy$ = new Subject();
  private postId: string = '';
  private paramsSubscription: Subscription = new Subscription;
  private postsSubscription: Subscription = new Subscription;

  constructor(private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.postId = data['id'];
    })

    this.postsSubscription = this.postsService.getPostById(this.postId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Post) => this.post = res,
        error: () => this.router.navigateByUrl('/error')
      })
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.paramsSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.deletePostFromTable();
        this.router.navigateByUrl('./home');
      } else {
        const url: string = `/view/${this.postId}`;
        this.router.navigateByUrl(url);
      }
    })
  }

  deletePostFromTable() {
    this.postsSubscription = this.postsService.deletePost()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: () => this.router.navigateByUrl('/error'),
      })
  }
}
