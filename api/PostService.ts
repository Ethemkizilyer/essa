"use client"
import { BaseService } from './BaseService';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export class PostService extends BaseService<Post> {
  // constructor() {
  //   super('https://jsonplaceholder.typicode.com/posts');
  // }
  protected endpoint = '/posts';
  // Post'lara özgü ek metodlar burada tanımlanabilir
}
