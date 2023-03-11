export const deletePost = {
  delete: {
    tags: ["posts"],
    summary: "Delete post by id",
    description:
      "Deletes a post from database using post id. note: only the creator of a post can delete it.",
    parameters: [
      {
        $ref: "#/components/parameters/id",
      },
    ],
    responses: {
      200: {
        $ref: "#/components/responses/Success/Deleted",
      },
      401: {
        $ref: "#/components/responses/UnauthorizedError",
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
