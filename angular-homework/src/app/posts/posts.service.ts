import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../shared/services/base-service';
import { Post } from './posts';
import { Observable } from 'rxjs';
import { postsUrl } from './shared/config';

@Injectable()
export class PostsService extends BaseService {
  override url: string = postsUrl;

  constructor(protected http: HttpClient) {
    super(http);
  }

  getPosts(): Observable<Post[]> {
    return this.get();
  }

  getPostById(id: string): Observable<Post> {
    this.url = `${this.url}/${id}`;
    return this.get();
  }

  addPost(post: Post): Observable<Post> {
    return this.post(post);
  }

  editPost(post: Post): Observable<Post> {
    return this.put(post);
  }

  deletePost(id: string) {
    this.url = `${this.url}/${id}`;
    return this.delete();
  }
}
