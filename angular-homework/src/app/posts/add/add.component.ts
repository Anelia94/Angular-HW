import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {
  public addPostForm: FormGroup = new FormGroup({});
  public titleFormControl = new FormControl('', [Validators.required]);
  public descriptionFormControl = new FormControl('', [Validators.required, Validators.minLength(10)]);

  private destroy$ = new Subject();

  constructor(private formBuilder: FormBuilder,
    private postService: PostsService,
    private router:Router) { }

  ngOnInit(): void {
    this.addPostForm = this.formBuilder.group({
      title: this.titleFormControl,
      body: this.descriptionFormControl,
    })
  }

  createPost() {
    if (this.isFormValid()) {
      this.postService.addPost(this.addPostForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.router.navigate(['/']),
          error: () => this.router.navigate(['/','error']),
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  isFormValid() {
    return this.titleFormControl.valid && this.descriptionFormControl.valid;
  }
}
