import { updatePost } from "./updatePost.doc";
import { getPost } from "./getPost.doc";
import { getPosts } from "./getPosts.doc";
import { deletePost } from "./deletePost.doc";
import { createPost } from "./createPost.doc";

const postDoc = {
  baseUrl: { ...getPosts, ...createPost },
  reqByID: { ...getPost, ...updatePost, ...deletePost },
};

export default postDoc;
