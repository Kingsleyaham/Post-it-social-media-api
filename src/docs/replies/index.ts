import { createReply } from "./createReply.doc";
import { updateReply } from "./updateReply.doc";
import { getReply } from "./getReply.doc";
import { getReplies } from "./getReplies.doc";
import { deleteReply } from "./deleteReply.doc";

const replyDoc = {
  baseUrl: { ...getReplies, ...createReply },
  reqByID: { ...getReply, ...updateReply, ...deleteReply },
};

export default replyDoc;
