import { updateUser } from "./updateUser.doc";
import { getUser } from "./getUser.doc";
import { getUsers } from "./getUsers.doc";
import { deleteUser } from "./deleteUser.doc";

const userDoc = {
  baseUrl: { ...getUsers },
  reqByID: { ...getUser, ...updateUser, ...deleteUser },
};

export default userDoc;
