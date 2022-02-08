import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit, OnDestroy {
  private postId: string = '';
  private destroy$ = new Subject();

  constructor(private activatedRoute: ActivatedRoute,
    private postsService: PostsService) { }

  ngOnInit(): void {
    this.deletePost();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  deletePost() {
    this.activatedRoute.params.subscribe(data => {
      this.postId = data['id'];
    })

    if (this.postId) {
      this.postsService.deletePost(this.postId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => window.location.href = './',
          error: () => window.location.href = './error',
          complete: () => console.log('HTTP request completed')
        })
    }
  }
}
