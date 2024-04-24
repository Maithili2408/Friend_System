import {PostRepo} from '../repositories';

class PostService{

    constructor(){
        this.postRepo = new PostRepo();
        process.env.PORT // 
    }


}

export default PostService;