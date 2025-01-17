import { Request, Response } from 'express';
import { ViewPosts } from "../../core/usecases/ViewPosts"
import { AddPost }  from "../../core/usecases/AddPost"


export class PostController {
  constructor(
    private viewPosts: ViewPosts,
    private addPost: AddPost      
  ) {}

  async getAllPosts(req: Request, res: Response) {

    const postList = await this.viewPosts.execute()
    
    res.status(200).json(postList);
  }

  async createPost(req: Request, res: Response){

    const { post } = req.body;

    const result = await this.addPost.execute(post);

    res.status(200).json(result)
  }


}
