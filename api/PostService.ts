
import { BaseService } from './BaseService'

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export class PostService extends BaseService<Post> { 
  protected endpoint = '/posts'
}
 
