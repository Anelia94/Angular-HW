import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public editPostForm: FormGroup = new FormGroup({});
  private destroy$ = new Subject();
  private postId: string = '';
  private post: any;
  public titleFormControl = new FormControl('', [Validators.required]);
  public descriptionFormControl = new FormControl('', [Validators.required, Validators.minLength(10)]);

  constructor(private formBuilder: FormBuilder,
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.editPostForm = this.formBuilder.group({
      title: this.titleFormControl,
      body: this.descriptionFormControl
    })

    this.activatedRoute.params.subscribe(data => {
      this.postId = data['id'];
    })

    this.post = this.postsService.getPostById(this.postId);
  }

  editPost() {
    if (this.isFormValid()) {
      this.postsService.editPost(this.editPostForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => window.location.href = './',
          error: () => window.location.href = './error'
        })
    }

  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  isFormValid() {
    return this.titleFormControl.valid && this.descriptionFormControl.valid;
  }
}
