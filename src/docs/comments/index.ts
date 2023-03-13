import { getUserComment } from "./getUserComment.doc";
import { getUserComments } from "./getUserComments.doc";
import { getComment } from "./getComment.doc";
import { updateComment } from "./updateComment.doc";
import { createComment } from "./createComment.doc";
import { getComments } from "./getComments.doc";
import { deleteComment } from "./deleteComment.doc";

const commentDoc = {
  baseUrl: { ...getComments, ...createComment },
  reqByID: { ...getComment, ...updateComment, ...deleteComment },
  userComments: { ...getUserComments },
  userSingleComment: { ...getUserComment },
};

export default commentDoc;
