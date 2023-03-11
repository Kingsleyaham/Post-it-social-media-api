export const deleteComment = {
  delete: {
    tags: ["comments"],
    summary: "Delete comment by id",
    description:
      "Deletes a comment. Only the owner of a comment can delete the comment.",
    parameters: [
      {
        $ref: "#/components/parameters/postId",
      },
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
